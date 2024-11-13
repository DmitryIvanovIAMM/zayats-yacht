import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

// Basic interface
interface User extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
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
    hashedPassword: {
      type: String,
      required: true
    },
    salt: String
  },
  {
    timestamps: true
  }
);

export type { User };
export default mongoose.model<User, Model<User>>('users', UserSchema);
