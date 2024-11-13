import * as mongoose from 'mongoose';

export interface Ship extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  type: string;
  builder: string;
  flag: string;
  homePort: string;
  class: string;
  imoNo: string;
  callSign: string;
}

const ShipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    builder: {
      type: String,
      required: true
    },
    flag: {
      type: String,
      required: true
    },
    homePort: {
      type: String,
      required: true
    },
    class: {
      type: String,
      required: true
    },
    imoNo: {
      type: String,
      required: true
    },
    callSign: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const ShipModel = mongoose.model<Ship>('ships', ShipSchema);

export const shipFields = [
  '_id',
  'name',
  'type',
  'builder',
  'flag',
  'homePort',
  'class',
  'imoNo',
  'callSign'
];
