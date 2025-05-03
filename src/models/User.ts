import * as mongoose from 'mongoose';
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { Roles } from '@/utils/types';

@modelOptions({
  schemaOptions: { timestamps: true, collection: 'users' }
})
export class User {
  @prop({ required: true })
  _id: mongoose.Types.ObjectId;
  @prop({ required: true })
  name: string;
  @prop({ required: true })
  email: string;
  @prop({ required: true, type: String, enum: Roles, default: Roles.User })
  role: Roles;
  @prop({ required: true })
  hashedPassword: string;
  @prop({ required: true })
  salt: number;
  @prop({ required: true, default: true })
  isActive: boolean;
  @prop({ required: true, default: false })
  emailValidated: boolean;
}

export const UserModel = mongoose.models?.User || getModelForClass(User);

export const userFrontendFields = ['_id', 'name', 'email', 'role'];

export interface UserFrontend {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
