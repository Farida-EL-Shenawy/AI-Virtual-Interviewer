import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import winston from 'winston';

// Setup test logger
export const testLogger = winston.createLogger({
  level: 'error', // Only log errors in test
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// MongoDB Memory Server instance
let mongoServer: MongoMemoryServer;

// Connect to in-memory database before tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear database between tests
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

// Disconnect and stop server after tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Global test utilities
export const testUtils = {
  // Create test user
  createTestUser: async (userData: any) => {
    const { User } = require('../models/User');
    return await User.create(userData);
  },

  // Generate test JWT token
  generateTestToken: (userId: string) => {
    const jwt = require('jsonwebtoken');
    return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'test-secret');
  },

  // Clear test database
  clearDatabase: async () => {
    const collections = await mongoose.connection.db.collections();
    return Promise.all(collections.map(collection => collection.deleteMany({})));
  }
};