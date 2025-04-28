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

export const PortModel = mongoose.models?.ports || mongoose.model<Port>('ports', PortSchema);

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
