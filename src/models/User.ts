import { models, Types } from 'mongoose';
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { Roles } from '@/utils/types';

@modelOptions({
  options: { customName: 'User' },
  schemaOptions: { timestamps: true, collection: 'users' }
})
export class User {
  @prop({ required: true })
  _id: Types.ObjectId;
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

export const UserModel = models?.User || getModelForClass(User);
