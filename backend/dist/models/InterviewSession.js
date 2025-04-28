"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewSession = exports.InterviewStatus = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var InterviewStatus;
(function (InterviewStatus) {
    InterviewStatus["SCHEDULED"] = "scheduled";
    InterviewStatus["IN_PROGRESS"] = "in_progress";
    InterviewStatus["COMPLETED"] = "completed";
    InterviewStatus["CANCELLED"] = "cancelled";
})(InterviewStatus || (exports.InterviewStatus = InterviewStatus = {}));
const interviewSessionSchema = new mongoose_1.Schema({
    candidateId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true,
        index: true
    },
    jobId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'JobPost',
        required: true,
        index: true
    },
    passcode: {
        type: String,
        required: true,
        unique: true
    },
    sessionStatus: {
        type: String,
        enum: Object.values(InterviewStatus),
        default: InterviewStatus.SCHEDULED
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: Date,
    videoPath: String,
    audioPath: String,
    totalScore: {
        type: Number,
        min: 0,
        max: 100
    },
    aiEvaluation: {
        technicalScore: {
            type: Number,
            min: 0,
            max: 100
        },
        communicationScore: {
            type: Number,
            min: 0,
            max: 100
        },
        confidenceScore: {
            type: Number,
            min: 0,
            max: 100
        },
        overallImpression: String
    }
}, {
    timestamps: true
});
// Compound indexes for efficient querying
interviewSessionSchema.index({ candidateId: 1, sessionStatus: 1 });
interviewSessionSchema.index({ jobId: 1, sessionStatus: 1 });
exports.InterviewSession = mongoose_1.default.model('InterviewSession', interviewSessionSchema);
//# sourceMappingURL=InterviewSession.js.map