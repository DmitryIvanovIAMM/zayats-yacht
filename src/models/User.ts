import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

interface User {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  role: string;
  hashedPassword: string;
  salt: number;
  isActive: boolean;
  emailValidated: boolean;
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
      default: 'user',
      required: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    salt: Number,
    isActive: {
      type: Boolean,
      required: true,
      default: true
    },
    emailValidated: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export type { User };
export const UserModel =
  mongoose.models?.users || mongoose.model<User, Model<User>>('users', UserSchema);
export const userFrontendFields = ['_id', 'name', 'email', 'role'];

export interface UserFrontend {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
