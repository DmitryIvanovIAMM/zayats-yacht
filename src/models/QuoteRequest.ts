import * as mongoose from 'mongoose';
import timestamps from './plugins/timestamp';

const Schema = mongoose.Schema;

export interface QuoteRequest extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  fromEmail: string;
  requestData: string;
}
const QuoteRequestSchema = new Schema({
  fromEmail: {
    type: String,
    required: true
  },
  requestData: {
    type: String,
    required: true
  }
});

QuoteRequestSchema.plugin(timestamps, { index: true });

export default mongoose.model<QuoteRequest>('quoteRequests', QuoteRequestSchema);
