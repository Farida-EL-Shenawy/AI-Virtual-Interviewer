"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const zod_1 = require("zod");
const winston_1 = __importDefault(require("winston"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Configure logger
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: 'combined.log' })
    ]
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple()
    }));
}
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
// Request logging middleware
app.use((req, _res, next) => {
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
        await mongoose_1.default.connect(mongoURI);
        logger.info('Connected to MongoDB');
    }
    catch (err) {
        logger.error('MongoDB connection error:', err);
        process.exit(1);
    }
};
connectDB();
// Routes
const auth_1 = __importDefault(require("./routes/auth"));
const password_reset_1 = __importDefault(require("./routes/password-reset"));
app.get('/', (_req, res) => {
    res.json({ message: 'Welcome to AI Virtual Interviewer API' });
});
app.use('/api/auth', auth_1.default);
app.use('/api/password-reset', password_reset_1.default);
// Error handling middleware
app.use((err, _req, res, _next) => {
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
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string().default('5000'),
    MONGODB_URI: zod_1.z.string().optional(),
    JWT_SECRET: zod_1.z.string()
});
try {
    envSchema.parse(process.env);
}
catch (err) {
    if (err instanceof zod_1.z.ZodError) {
        logger.error('Environment validation failed:', err.errors);
        process.exit(1);
    }
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map