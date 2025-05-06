import * as mongoose from 'mongoose';
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: { timestamps: true, collection: 'quoterequests' }
})
export class QuoteRequest {
  @prop({ required: true })
  _id: mongoose.Types.ObjectId;
  @prop({ required: true })
  fromUserId: mongoose.Types.ObjectId;
  @prop({ required: true })
  fromName: string;
  @prop({ required: true })
  fromEmail: string;
  @prop({ required: true })
  receivedAt: string;
  @prop({ required: true })
  requestData: string;
  @prop({ required: true })
  requestObject: object;
}

export const QuoteRequestModel = mongoose.models?.QuoteRequest || getModelForClass(QuoteRequest);
