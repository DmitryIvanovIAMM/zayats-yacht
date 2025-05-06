import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { models, Types } from 'mongoose';

@modelOptions({
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
}

export const PortModel = models?.Port || getModelForClass(Port);
