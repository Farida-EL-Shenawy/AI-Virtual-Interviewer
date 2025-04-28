import mongoose from 'mongoose';
import { User, UserValidationSchema, IUser } from '../User';
import { testUtils } from '../../test/setup';

describe('User Model Test Suite', () => {
  const validUserData = {
    email: 'test@example.com',
    password: 'Password123!',
    role: 'candidate' as const,
    firstName: 'John',
    lastName: 'Doe',
    profileComplete: false
  };

  beforeEach(async () => {
    await testUtils.clearDatabase();
  });

  describe('User Validation', () => {
    it('should validate a correct user input', () => {
      const result = UserValidationSchema.safeParse(validUserData);
      expect(result.success).toBe(true);
    });

    it('should fail on invalid email', () => {
      const invalidUser = { ...validUserData, email: 'invalid-email' };
      const result = UserValidationSchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
    });

    it('should fail on short password', () => {
      const invalidUser = { ...validUserData, password: 'short' };
      const result = UserValidationSchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
    });

    it('should fail on invalid role', () => {
      const invalidUser = { ...validUserData, role: 'invalid-role' };
      const result = UserValidationSchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
    });
  });

  describe('User Model Operations', () => {
    it('should create & save user successfully', async () => {
      const validUser = new User(validUserData);
      const savedUser = await validUser.save();
      
      expect(savedUser._id).toBeDefined();
      expect(savedUser.email).toBe(validUserData.email);
      expect(savedUser.password).not.toBe(validUserData.password); // Password should be hashed
    });

    it('should fail to save user with duplicate email', async () => {
      const firstUser = new User(validUserData);
      await firstUser.save();

      const duplicateUser = new User(validUserData);
      await expect(duplicateUser.save()).rejects.toThrow();
    });

    it('should correctly compare passwords', async () => {
      const user = new User(validUserData);
      await user.save();

      const isMatch = await user.comparePassword(validUserData.password);
      expect(isMatch).toBe(true);

      const isNotMatch = await user.comparePassword('wrongpassword');
      expect(isNotMatch).toBe(false);
    });
  });

  describe('Indexes', () => {
    it('should have required indexes', async () => {
      const indexes = await User.collection.indexes();
      
      // Check for email index
      expect(indexes.some(index => index.key.email === 1)).toBe(true);
      
      // Check for role index
      expect(indexes.some(index => index.key.role === 1)).toBe(true);
      
      // Check for compound index
      expect(indexes.some(index => 
        index.key.company === 1 && index.key.role === 1
      )).toBe(true);
    });
  });

  describe('JSON Transformation', () => {
    it('should remove password when converting to JSON', async () => {
      const user = new User(validUserData);
      await user.save();

      const userJSON = user.toJSON();
      expect(userJSON.password).toBeUndefined();
    });
  });
});