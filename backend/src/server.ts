import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { z } from 'zod';
import winston from 'winston';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Define error types
interface ApiError extends Error {
  statusCode?: number;
  errors?: any[];
}

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Request logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// Database connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-interviewer';
    await mongoose.connect(mongoURI);
    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB();

// Routes
import authRoutes from './routes/auth';
import passwordResetRoutes from './routes/password-reset';

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to AI Virtual Interviewer API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/password-reset', passwordResetRoutes);

// Error handling middleware
app.use((err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';
  const errors = err.errors || [];

  res.status(statusCode).json({
    success: false,
    message,
    errors
  });
});

// Validate environment variables
const envSchema = z.object({
  PORT: z.string().default('5000'),
  MONGODB_URI: z.string().optional(),
  JWT_SECRET: z.string()
});

try {
  envSchema.parse(process.env);
} catch (err) {
  if (err instanceof z.ZodError) {
    logger.error('Environment validation failed:', err.errors);
    process.exit(1);
  }
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

export default app;