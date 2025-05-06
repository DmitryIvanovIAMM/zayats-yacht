import { models, Types } from 'mongoose';
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  options: { customName: 'Sailing' },
  schemaOptions: { timestamps: true, collection: 'sailings' }
})
export class Sailing {
  @prop({ required: true })
  _id: Types.ObjectId;
  @prop({ required: true })
  name: string;
  @prop({ required: true })
  isActive: boolean;
  @prop({ required: false })
  deletedAt?: Date;
}

export const SailingModel = models?.Sailing || getModelForClass(Sailing);
