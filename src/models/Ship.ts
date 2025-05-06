import * as mongoose from 'mongoose';
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: { timestamps: true, collection: 'ships' }
})
export class Ship {
  @prop({ required: true })
  _id: mongoose.Types.ObjectId;
  @prop({ required: true })
  name: string;
  @prop({ required: true })
  type: string;
  @prop({ required: true })
  builder: string;
  @prop({ required: true })
  flag: string;
  @prop({ required: true })
  homePort: string;
  @prop({ required: true })
  class: string;
  @prop({ required: true })
  imoNo: string;
  @prop({ required: true })
  callSign: string;
}

export const ShipModel = mongoose.models?.Ship || getModelForClass(Ship);
