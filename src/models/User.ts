import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

interface User extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  role: string;
  hashedPassword: string;
  salt: string;
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    hashedPassword: {
      type: String,
      required: true
    },
    salt: Number
  },
  {
    timestamps: true
  }
);

export type { User };
export const UserModel =
  mongoose.models?.users || mongoose.model<User, Model<User>>('users', UserSchema);
export const userFields = ['_id', 'name', 'email', 'role'];

export interface UserFrontend {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
