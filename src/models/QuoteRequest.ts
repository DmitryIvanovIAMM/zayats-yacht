import { models, Types } from 'mongoose';
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: { timestamps: true, collection: 'quoterequests' }
})
export class QuoteRequest {
  @prop({ required: true })
  _id: Types.ObjectId;
  @prop({ required: true })
  fromUserId: Types.ObjectId;
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

export const QuoteRequestModel = models?.QuoteRequest || getModelForClass(QuoteRequest);
