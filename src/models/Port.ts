import * as mongoose from 'mongoose';

export interface Port extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  portName: string;
  destinationName: string;
  imageFileName: string;
}

const PortSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true
  }
);

export default mongoose.model<Port>('ports', PortSchema);

export const portFields = ['_id', 'portName', 'destinationName', 'imageFileName'];
