"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const Log_1 = require("../models/Log");
const router = express_1.default.Router();
// User Registration
router.post('/register', async (req, res) => {
    try {
        const { email, password, role, name, companyName } = req.body;
        // Check if user already exists
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create new user
        const user = new User_1.User({
            email,
            passwordHash: password, // Will be hashed by pre-save middleware
            role,
            name,
            companyName: role === User_1.UserRole.COMPANY ? companyName : undefined
        });
        await user.save();
        // Log the registration
        await new Log_1.Log({
            userId: user._id,
            action: Log_1.LogActionType.USER_REGISTER,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'] || '',
            details: {
                description: 'User registration',
                status: 'success'
            }
        }).save();
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
        res.status(201).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name,
                companyName: user.companyName
            }
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});
// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Verify password
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Log the login
        await new Log_1.Log({
            userId: user._id,
            action: Log_1.LogActionType.USER_LOGIN,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'] || '',
            details: {
                description: 'User login',
                status: 'success'
            }
        }).save();
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name,
                companyName: user.companyName
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map