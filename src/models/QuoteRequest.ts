import * as mongoose from 'mongoose';

export interface QuoteRequest extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  fromEmail: string;
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

export default mongoose.model<QuoteRequest>('quoteRequests', QuoteRequestSchema);
