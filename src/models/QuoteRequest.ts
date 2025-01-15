import * as mongoose from 'mongoose';

export interface QuoteRequest extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  fromEmail: string;
  receivedAt: string;
  requestData: string;
}

const QuoteRequestSchema = new mongoose.Schema(
  {
    fromEmail: {
      type: String,
      required: true
    },
    requestData: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const QuoteRequestModel =
  mongoose.models?.quoteRequests ||
  mongoose.model<QuoteRequest>('quoteRequests', QuoteRequestSchema);
