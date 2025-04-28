"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrationConfig = exports.connectDatabase = exports.dbConfig = void 0;
const winston_1 = __importDefault(require("winston"));
// Logger instance
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.File({ filename: 'database.log' })
    ]
});
// Add console transport in development
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple()
    }));
}
// Database configuration
exports.dbConfig = {
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-interviewer',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true, // Build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    }
};
// Database connection handler
const connectDatabase = async () => {
    try {
        await mongoose.connect(exports.dbConfig.mongoUri, exports.dbConfig.options);
        logger.info('Successfully connected to database');
        // Handle connection events
        mongoose.connection.on('error', (error) => {
            logger.error('Database connection error:', error);
        });
        mongoose.connection.on('disconnected', () => {
            logger.warn('Database disconnected');
        });
        mongoose.connection.on('reconnected', () => {
            logger.info('Database reconnected');
        });
    }
    catch (error) {
        logger.error('Failed to connect to database:', error);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
// Migration configuration
exports.migrationConfig = {
    migrationsPath: './src/migrations',
    dbName: 'ai-interviewer',
    migrationCollection: 'migrations',
    logger: logger
};
//# sourceMappingURL=database.js.map