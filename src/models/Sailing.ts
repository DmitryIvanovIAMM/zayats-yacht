import * as mongoose from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';

export class Sailing {
  @prop({ required: true })
  _id: mongoose.Types.ObjectId;
  @prop({ required: true })
  name: string;
  @prop({ required: false })
  deletedAt?: Date;
}

export const SailingModel =
  mongoose.models?.Sailing || getModelForClass(Sailing, { schemaOptions: { timestamps: true } });

export interface SailingFrontend {
  _id: string | null;
  name: string;
}

export const sailingFrontendFields = ['_id', 'name'];
