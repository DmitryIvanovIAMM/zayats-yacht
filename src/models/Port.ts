import * as mongoose from 'mongoose';
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: { timestamps: true, collection: 'ports' }
})
export class Port {
  @prop({ required: true })
  _id: mongoose.Types.ObjectId;

  @prop({ required: true })
  portName: string;

  @prop({ required: true })
  destinationName: string;

  @prop({ required: true })
  imageFileName: string;
}

export const PortModel = mongoose.models?.Port || getModelForClass(Port);
