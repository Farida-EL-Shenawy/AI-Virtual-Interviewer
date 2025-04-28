import mongoose, { Document } from 'mongoose';
import { z } from 'zod';
export type UserRole = 'candidate' | 'company' | 'admin';
export interface IUser extends Document {
    email: string;
    password: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    company?: string;
    position?: string;
    profileComplete: boolean;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export declare const UserValidationSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodEnum<["candidate", "company", "admin"]>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    company: z.ZodOptional<z.ZodString>;
    position: z.ZodOptional<z.ZodString>;
    profileComplete: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    role: "candidate" | "company" | "admin";
    firstName: string;
    lastName: string;
    profileComplete: boolean;
    company?: string | undefined;
    position?: string | undefined;
}, {
    email: string;
    password: string;
    role: "candidate" | "company" | "admin";
    firstName: string;
    lastName: string;
    company?: string | undefined;
    position?: string | undefined;
    profileComplete?: boolean | undefined;
}>;
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & {
    _id: mongoose.Types.ObjectId;
}, any>;
