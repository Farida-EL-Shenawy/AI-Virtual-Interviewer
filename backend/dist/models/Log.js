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
exports.Log = exports.LogActionType = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var LogActionType;
(function (LogActionType) {
    LogActionType["USER_LOGIN"] = "user_login";
    LogActionType["USER_LOGOUT"] = "user_logout";
    LogActionType["USER_REGISTER"] = "user_register";
    LogActionType["INTERVIEW_START"] = "interview_start";
    LogActionType["INTERVIEW_END"] = "interview_end";
    LogActionType["DATA_ACCESS"] = "data_access";
    LogActionType["DATA_MODIFICATION"] = "data_modification";
    LogActionType["DATA_DELETION"] = "data_deletion";
    LogActionType["CONSENT_GIVEN"] = "consent_given";
    LogActionType["CONSENT_WITHDRAWN"] = "consent_withdrawn";
    LogActionType["SECURITY_EVENT"] = "security_event";
})(LogActionType || (exports.LogActionType = LogActionType = {}));
const logSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    action: {
        type: String,
        enum: Object.values(LogActionType),
        required: true,
        index: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    details: {
        resource: String,
        resourceId: String,
        description: {
            type: String,
            required: true
        },
        changes: mongoose_1.Schema.Types.Mixed,
        status: {
            type: String,
            enum: ['success', 'failure'],
            required: true
        },
        errorMessage: String
    },
    gdprCompliance: {
        dataCategory: String,
        processingPurpose: String,
        legalBasis: String,
        retentionPeriod: String
    }
}, {
    timestamps: true
});
// Indexes for efficient querying and compliance reporting
logSchema.index({ timestamp: -1 });
logSchema.index({ action: 1, timestamp: -1 });
logSchema.index({ userId: 1, action: 1, timestamp: -1 });
// Ensure logs are immutable
logSchema.pre('save', function (next) {
    if (!this.isNew) {
        const err = new Error('Logs cannot be modified after creation');
        next(err);
    }
    next();
});
exports.Log = mongoose_1.default.model('Log', logSchema);
//# sourceMappingURL=Log.js.map