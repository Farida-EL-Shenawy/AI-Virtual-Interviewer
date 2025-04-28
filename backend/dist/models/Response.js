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
exports.Response = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const responseSchema = new mongoose_1.Schema({
    questionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
        index: true
    },
    responseText: {
        type: String,
        required: true
    },
    responseAudioPath: String,
    responseVideoPath: String,
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    nlpAnalysis: {
        relevanceScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        technicalAccuracyScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        clarityScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        keywords: [String]
    },
    speechAnalysis: {
        confidence: {
            type: Number,
            min: 0,
            max: 100
        },
        nervousness: {
            type: Number,
            min: 0,
            max: 100
        },
        enthusiasm: {
            type: Number,
            min: 0,
            max: 100
        },
        speakingRate: {
            type: Number,
            min: 0,
            max: 100
        },
        clarity: {
            type: Number,
            min: 0,
            max: 100
        }
    },
    facialAnalysis: {
        emotions: {
            joy: {
                type: Number,
                min: 0,
                max: 100
            },
            nervousness: {
                type: Number,
                min: 0,
                max: 100
            },
            confidence: {
                type: Number,
                min: 0,
                max: 100
            },
            engagement: {
                type: Number,
                min: 0,
                max: 100
            }
        },
        eyeContact: {
            type: Number,
            min: 0,
            max: 100
        },
        fidgetingLevel: {
            type: Number,
            min: 0,
            max: 100
        }
    }
}, {
    timestamps: true
});
// Indexes for efficient querying
responseSchema.index({ questionId: 1, timestamp: 1 });
exports.Response = mongoose_1.default.model('Response', responseSchema);
//# sourceMappingURL=Response.js.map