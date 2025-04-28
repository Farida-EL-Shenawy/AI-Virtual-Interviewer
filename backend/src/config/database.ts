import { ConnectionOptions } from 'mongoose';
import winston from 'winston';

// Database configuration interface
interface DatabaseConfig {
  mongoUri: string;
  options: ConnectionOptions;
}

// Logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'database.log' })
  ]
});

// Add console transport in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Database configuration
export const dbConfig: DatabaseConfig = {
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
export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(dbConfig.mongoUri, dbConfig.options);
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

  } catch (error) {
    logger.error('Failed to connect to database:', error);
    process.exit(1);
  }
};

// Migration configuration
export const migrationConfig = {
  migrationsPath: './src/migrations',
  dbName: 'ai-interviewer',
  migrationCollection: 'migrations',
  logger: logger
};