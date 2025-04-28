import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// User role type definition
export type UserRole = 'candidate' | 'company' | 'admin';

// User interface
export interface IUser extends Document {
  email: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  company?: string;
  position?: string;
  profileComplete: boolean;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// User validation schema
export const UserValidationSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['candidate', 'company', 'admin']),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  company: z.string().optional(),
  position: z.string().optional(),
  profileComplete: z.boolean().default(false),
});

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true, // Index for faster queries
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ['candidate', 'company', 'admin'],
      required: true,
      index: true, // Index for role-based queries
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      sparse: true, // Sparse index for optional field
    },
    position: {
      type: String,
      trim: true,
    },
    profileComplete: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password; // Remove password from JSON responses
        return ret;
      },
    },
  }
);

// Index for common queries
userSchema.index({ createdAt: -1 });
userSchema.index({ lastLogin: -1 });

// Compound index for company users
userSchema.index({ company: 1, role: 1 }, { sparse: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

export const User = mongoose.model<IUser>('User', userSchema);