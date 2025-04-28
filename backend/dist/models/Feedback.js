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
exports.Feedback = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const feedbackSchema = new mongoose_1.Schema({
    sessionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'InterviewSession',
        required: true,
        unique: true,
        index: true
    },
    finalScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    strengths: [{
            type: String,
            required: true
        }],
    weaknesses: [{
            type: String,
            required: true
        }],
    recommendations: [{
            type: String,
            required: true
        }],
    technicalEvaluation: {
        overallScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        detailedScores: [{
                category: {
                    type: String,
                    required: true
                },
                score: {
                    type: Number,
                    required: true,
                    min: 0,
                    max: 100
                },
                comments: {
                    type: String,
                    required: true
                }
            }]
    },
    softSkillsEvaluation: {
        communicationScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        confidenceScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        problemSolvingScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        adaptabilityScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        }
    },
    personalityTraits: [String],
    improvementAreas: [String],
    isSharedWithCandidate: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
// Create index for efficient querying
feedbackSchema.index({ 'technicalEvaluation.overallScore': -1 });
feedbackSchema.index({ finalScore: -1 });
exports.Feedback = mongoose_1.default.model('Feedback', feedbackSchema);
//# sourceMappingURL=Feedback.js.map