"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InterviewSession_1 = require("../models/InterviewSession");
const JobPost_1 = require("../models/JobPost");
const Log_1 = require("../models/Log");
const User_1 = require("../models/User");
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
// Start a new interview session
router.post('/start', authenticateToken, async (req, res) => {
    try {
        const { jobPostId, passcode } = req.body;
        // Verify job post exists and is active
        const jobPost = await JobPost_1.JobPost.findById(jobPostId);
        if (!jobPost || jobPost.status !== 'active') {
            return res.status(404).json({ message: 'Job posting not found or inactive' });
        }
        // Verify passcode
        if (jobPost.passcode !== passcode) {
            return res.status(401).json({ message: 'Invalid passcode' });
        }
        // Create new interview session
        const session = new InterviewSession_1.InterviewSession({
            candidateId: req.user.userId,
            jobPostId: jobPost._id,
            status: 'in_progress',
            startTime: new Date()
        });
        await session.save();
        // Log interview start
        await new Log_1.Log({
            userId: req.user.userId,
            action: Log_1.LogActionType.INTERVIEW_START,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'] || '',
            details: {
                resource: 'InterviewSession',
                resourceId: session._id.toString(),
                description: 'Started new interview session',
                status: 'success'
            }
        }).save();
        res.status(201).json(session);
    }
    catch (error) {
        console.error('Error starting interview:', error);
        res.status(500).json({ message: 'Error starting interview session' });
    }
});
// End interview session
router.post('/:id/end', authenticateToken, async (req, res) => {
    try {
        const session = await InterviewSession_1.InterviewSession.findOne({
            _id: req.params.id,
            candidateId: req.user.userId,
            status: 'in_progress'
        });
        if (!session) {
            return res.status(404).json({ message: 'Active interview session not found' });
        }
        session.status = 'completed';
        session.endTime = new Date();
        await session.save();
        // Log interview end
        await new Log_1.Log({
            userId: req.user.userId,
            action: Log_1.LogActionType.INTERVIEW_END,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'] || '',
            details: {
                resource: 'InterviewSession',
                resourceId: session._id.toString(),
                description: 'Completed interview session',
                status: 'success'
            }
        }).save();
        res.json(session);
    }
    catch (error) {
        console.error('Error ending interview:', error);
        res.status(500).json({ message: 'Error ending interview session' });
    }
});
// Get interview session by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const session = await InterviewSession_1.InterviewSession.findById(req.params.id)
            .populate('candidateId', 'name email')
            .populate('jobPostId');
        if (!session) {
            return res.status(404).json({ message: 'Interview session not found' });
        }
        // Verify access rights
        if (req.user.role === User_1.UserRole.CANDIDATE && session.candidateId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Access denied' });
        }
        if (req.user.role === User_1.UserRole.COMPANY) {
            const jobPost = await JobPost_1.JobPost.findById(session.jobPostId);
            if (jobPost?.companyId.toString() !== req.user.userId) {
                return res.status(403).json({ message: 'Access denied' });
            }
        }
        res.json(session);
    }
    catch (error) {
        console.error('Error fetching interview:', error);
        res.status(500).json({ message: 'Error fetching interview session' });
    }
});
// Get all interview sessions for a candidate or company
router.get('/', authenticateToken, async (req, res) => {
    try {
        let query = {};
        if (req.user.role === User_1.UserRole.CANDIDATE) {
            query = { candidateId: req.user.userId };
        }
        else if (req.user.role === User_1.UserRole.COMPANY) {
            const jobPosts = await JobPost_1.JobPost.find({ companyId: req.user.userId });
            const jobPostIds = jobPosts.map(post => post._id);
            query = { jobPostId: { $in: jobPostIds } };
        }
        const sessions = await InterviewSession_1.InterviewSession.find(query)
            .populate('candidateId', 'name email')
            .populate('jobPostId')
            .sort({ startTime: -1 });
        res.json(sessions);
    }
    catch (error) {
        console.error('Error fetching interviews:', error);
        res.status(500).json({ message: 'Error fetching interview sessions' });
    }
});
exports.default = router;
//# sourceMappingURL=interviews.js.map