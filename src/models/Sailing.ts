import * as mongoose from 'mongoose';
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: { timestamps: true, collection: 'sailings' }
})
export class Sailing {
  @prop({ required: true })
  _id: mongoose.Types.ObjectId;
  @prop({ required: true })
  name: string;
  @prop({ required: true })
  isActive: boolean;
  @prop({ required: false })
  deletedAt?: Date;
}

export const SailingModel = mongoose.models?.Sailing || getModelForClass(Sailing);
