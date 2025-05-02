import mongoose, { Types, Schema, Document, model } from 'mongoose';
import { Port, PortFrontend } from '@/models/Port';
import { Ship } from '@/models/Ship';
import { Sailing, SailingFrontend } from '@/models/Sailing';

export interface ShipStop extends Document {
  sailingId: Types.ObjectId;
  portId: Types.ObjectId | Port;
  shipId: Types.ObjectId | Ship;
  arrivalOn: Date;
  departureOn: Date;
  miles: number;
  daysAtSea: number;
  daysInPort: number;
  departurePort?: Port;
  sailing?: Sailing;
}

const ShipStopSchema = new Schema(
  {
    sailingId: {
      type: Types.ObjectId,
      required: true
    },
    portId: {
      type: Types.ObjectId,
      required: true
    },
    shipId: {
      type: Types.ObjectId,
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

export const ShipStopModel =
  mongoose.models?.shipStops || model<ShipStop>('shipStops', ShipStopSchema);
// export const PortModel = mongoose.models?.ports || mongoose.model<Port>('ports', PortSchema);
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

export interface ShipStopFrontend {
  sailingId: string;
  portId: string;
  shipId: string;
  arrivalOn: string;
  departureOn: string;
  miles: number;
  daysAtSea: number;
  daysInPort: number;
  departurePort?: PortFrontend;
  sailing?: SailingFrontend;
}
export interface ShipStopWithSailingAndPort extends ShipStopFrontend {
  sailing: SailingFrontend;
  port: PortFrontend;
}

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
