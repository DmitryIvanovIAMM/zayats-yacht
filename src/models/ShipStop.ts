import * as mongoose from 'mongoose';
import timestamps from './plugins/timestamp';

const Schema = mongoose.Schema;

export interface ShipStop extends mongoose.Document {
  sailingId: mongoose.Types.ObjectId;
  portId: mongoose.Types.ObjectId;
  shipId: mongoose.Types.ObjectId;
  arrivalOn: Date;
  departureOn: Date;
  miles: number;
  daysAtSea: number;
  daysInPort: number;
};

const ShipStopSchema = new Schema({
  sailingId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  portId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  shipId: {
    type: Schema.Types.ObjectId,
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
});

ShipStopSchema.plugin(timestamps, { index: true });

export default mongoose.model<ShipStop>('shipStops', ShipStopSchema);

export const shipStopsFields = [
  '_id',
  'sailingId',
  'portId',
  'arrivalOn',
  'departureOn',
  'miles',
  'daysAtSea',
  'daysInPort',
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
