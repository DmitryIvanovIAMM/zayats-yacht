import * as mongoose from 'mongoose';
import timestamps from './plugins/timestamp';

const Schema = mongoose.Schema;

export interface Sailing extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  deletedAt?: Date;
}

export const sailingRequiredFields = ['_id', 'name'];

const SailingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  deletedAt: {
    type: Date,
    required: false
  },
  isActive: {
    type: Boolean,
    required: false
  }
});

SailingSchema.plugin(timestamps, { index: true });

export default mongoose.model<Sailing>('sailings', SailingSchema);
