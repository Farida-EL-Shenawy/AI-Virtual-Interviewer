"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const JobPost_1 = require("../models/JobPost");
const User_1 = require("../models/User");
const Log_1 = require("../models/Log");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
        if (err)
            return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};
// Create a new job posting (Company only)
router.post('/', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== User_1.UserRole.COMPANY) {
            return res.status(403).json({ message: 'Only companies can create job postings' });
        }
        const jobPost = new JobPost_1.JobPost({
            companyId: req.user.userId,
            ...req.body
        });
        await jobPost.save();
        // Log job creation
        await new Log_1.Log({
            userId: req.user.userId,
            action: Log_1.LogActionType.DATA_MODIFICATION,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'] || '',
            details: {
                resource: 'JobPost',
                resourceId: jobPost._id.toString(),
                description: 'Created new job posting',
                status: 'success'
            }
        }).save();
        res.status(201).json(jobPost);
    }
    catch (error) {
        console.error('Error creating job post:', error);
        res.status(500).json({ message: 'Error creating job posting' });
    }
});
// Get all active job postings
router.get('/', async (req, res) => {
    try {
        const jobPosts = await JobPost_1.JobPost.find({ status: 'active' })
            .populate('companyId', 'companyName')
            .sort({ createdAt: -1 });
        res.json(jobPosts);
    }
    catch (error) {
        console.error('Error fetching job posts:', error);
        res.status(500).json({ message: 'Error fetching job postings' });
    }
});
// Get job posting by ID
router.get('/:id', async (req, res) => {
    try {
        const jobPost = await JobPost_1.JobPost.findById(req.params.id)
            .populate('companyId', 'companyName');
        if (!jobPost) {
            return res.status(404).json({ message: 'Job posting not found' });
        }
        res.json(jobPost);
    }
    catch (error) {
        console.error('Error fetching job post:', error);
        res.status(500).json({ message: 'Error fetching job posting' });
    }
});
// Update job posting (Company only)
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== User_1.UserRole.COMPANY) {
            return res.status(403).json({ message: 'Only companies can update job postings' });
        }
        const jobPost = await JobPost_1.JobPost.findOne({
            _id: req.params.id,
            companyId: req.user.userId
        });
        if (!jobPost) {
            return res.status(404).json({ message: 'Job posting not found' });
        }
        Object.assign(jobPost, req.body);
        await jobPost.save();
        // Log job update
        await new Log_1.Log({
            userId: req.user.userId,
            action: Log_1.LogActionType.DATA_MODIFICATION,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'] || '',
            details: {
                resource: 'JobPost',
                resourceId: jobPost._id.toString(),
                description: 'Updated job posting',
                status: 'success',
                changes: req.body
            }
        }).save();
        res.json(jobPost);
    }
    catch (error) {
        console.error('Error updating job post:', error);
        res.status(500).json({ message: 'Error updating job posting' });
    }
});
// Delete job posting (Company only)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== User_1.UserRole.COMPANY) {
            return res.status(403).json({ message: 'Only companies can delete job postings' });
        }
        const jobPost = await JobPost_1.JobPost.findOneAndDelete({
            _id: req.params.id,
            companyId: req.user.userId
        });
        if (!jobPost) {
            return res.status(404).json({ message: 'Job posting not found' });
        }
        // Log job deletion
        await new Log_1.Log({
            userId: req.user.userId,
            action: Log_1.LogActionType.DATA_DELETION,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'] || '',
            details: {
                resource: 'JobPost',
                resourceId: req.params.id,
                description: 'Deleted job posting',
                status: 'success'
            }
        }).save();
        res.json({ message: 'Job posting deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting job post:', error);
        res.status(500).json({ message: 'Error deleting job posting' });
    }
});
exports.default = router;
//# sourceMappingURL=jobs.js.map