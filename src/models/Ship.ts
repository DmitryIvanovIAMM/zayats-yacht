import { models, Types } from 'mongoose';
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  options: { customName: 'Ship' },
  schemaOptions: { timestamps: true, collection: 'ships' }
})
export class Ship {
  @prop({ required: true })
  _id: Types.ObjectId;
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

export const ShipModel = models?.Ship || getModelForClass(Ship);
