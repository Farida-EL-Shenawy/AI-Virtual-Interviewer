import mongoose from 'mongoose';
import winston from 'winston';
export declare const testLogger: winston.Logger;
export declare const testUtils: {
    createTestUser: (userData: any) => Promise<any>;
    generateTestToken: (userId: string) => any;
    clearDatabase: () => Promise<mongoose.mongo.DeleteResult[]>;
};
