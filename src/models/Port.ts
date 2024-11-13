import * as mongoose from 'mongoose';
import timestamps from './plugins/timestamp';

const Schema = mongoose.Schema;

export interface Port extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  portName: string;
  destinationName: string;
  imageFileName: string;
}

const PortSchema = new Schema({
  portName: {
    type: String,
    required: true
  },
  destinationName: {
    type: String,
    required: true
  },
  imageFileName: {
    type: String,
    required: true
  }
});

PortSchema.plugin(timestamps, { index: true });

export default mongoose.model<Port>('ports', PortSchema);

export const portFields = ['_id', 'portName', 'destinationName', 'imageFileName'];
