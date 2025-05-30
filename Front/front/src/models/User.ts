import mongoose, { Schema, Document } from 'mongoose';

// interface
export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
}

// schema
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
