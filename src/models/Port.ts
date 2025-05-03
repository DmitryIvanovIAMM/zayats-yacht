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

export interface PortFrontend {
  _id: string | null;
  portName: string;
  destinationName: string;
  imageFileName: string;
}
export const portFrontendFields = ['_id', 'portName', 'destinationName', 'imageFileName'];

export interface Destination {
  destinationName: string;
  ports: { _id: mongoose.Types.ObjectId; portName: string }[];
}
