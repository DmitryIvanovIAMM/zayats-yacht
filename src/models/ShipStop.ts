import * as mongoose from 'mongoose';

export interface ShipStop extends mongoose.Document {
  sailingId: mongoose.Types.ObjectId;
  portId: mongoose.Types.ObjectId;
  shipId: mongoose.Types.ObjectId;
  arrivalOn: Date;
  departureOn: Date;
  miles: number;
  daysAtSea: number;
  daysInPort: number;
}

const ShipStopSchema = new mongoose.Schema(
  {
    sailingId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    portId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    shipId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    arrivalOn: {
      type: Date,
      required: true
    },
    departureOn: {
      type: Date,
      required: true
    },
    miles: {
      type: Number,
      required: true
    },
    daysAtSea: {
      type: Number,
      required: true
    },
    daysInPort: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const ShipStopModel = mongoose.model<ShipStop>('shipStops', ShipStopSchema);

export const shipStopsFields = [
  '_id',
  'sailingId',
  'portId',
  'arrivalOn',
  'departureOn',
  'miles',
  'daysAtSea',
  'daysInPort'
];

export const shipStopsWithPortAndSailingFields = [
  '_id',
  'sailingId',
  'portId',
  'arrivalOn',
  'departureOn',
  'miles',
  'daysAtSea',
  'daysInPort',
  'departurePort',
  'sailing'
];
