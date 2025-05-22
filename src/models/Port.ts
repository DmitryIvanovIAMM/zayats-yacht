import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { models, Types } from 'mongoose';

@modelOptions({
  options: { customName: 'Port' },
  schemaOptions: { timestamps: true, collection: 'ports' }
})
export class Port {
  @prop({ required: true })
  _id: Types.ObjectId;

  @prop({ required: true })
  portName: string;

  @prop({ required: true })
  destinationName: string;

  @prop({ required: true })
  imageFileName: string;

  @prop({ required: false })
  deletedAt?: Date;
  @prop({ required: false })
  deletedBy?: Types.ObjectId;
}

export const PortModel = models?.Port || getModelForClass(Port);
