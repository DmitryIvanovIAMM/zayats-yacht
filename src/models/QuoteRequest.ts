import * as mongoose from 'mongoose';
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: { timestamps: true, collection: 'quotarequests' }
})
export class QuoteRequest {
  @prop({ required: true })
  _id: mongoose.Types.ObjectId;
  @prop({ required: true })
  fromEmail: string;
  @prop({ required: true })
  receivedAt: string;
  @prop({ required: true })
  requestData: string;
}

export const QuoteRequestModel = mongoose.models?.QuoteRequest || getModelForClass(QuoteRequest);
