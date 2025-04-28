"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testUtils = exports.testLogger = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const winston_1 = __importDefault(require("winston"));
// Setup test logger
exports.testLogger = winston_1.default.createLogger({
    level: 'error', // Only log errors in test
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.simple()
        })
    ]
});
// MongoDB Memory Server instance
let mongoServer;
// Connect to in-memory database before tests
beforeAll(async () => {
    mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose_1.default.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});
// Clear database between tests
beforeEach(async () => {
    const collections = await mongoose_1.default.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});
// Disconnect and stop server after tests
afterAll(async () => {
    await mongoose_1.default.disconnect();
    await mongoServer.stop();
});
// Global test utilities
exports.testUtils = {
    // Create test user
    createTestUser: async (userData) => {
        const { User } = require('../models/User');
        return await User.create(userData);
    },
    // Generate test JWT token
    generateTestToken: (userId) => {
        const jwt = require('jsonwebtoken');
        return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'test-secret');
    },
    // Clear test database
    clearDatabase: async () => {
        const collections = await mongoose_1.default.connection.db.collections();
        return Promise.all(collections.map(collection => collection.deleteMany({})));
    }
};
//# sourceMappingURL=setup.js.map