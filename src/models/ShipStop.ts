import mongoose, { Types, Schema, Document, model } from 'mongoose';
import { Port, PortFrontend } from '@/models/Port';
import { Ship } from '@/models/Ship';
import { Sailing, SailingFrontend } from '@/models/Sailing';
import { prop, getModelForClass } from '@typegoose/typegoose';

export class ShipStop {
  @prop({ required: true })
  _id: Types.ObjectId;
  @prop({ required: true })
  sailingId: Types.ObjectId;
  @prop({ required: true })
  portId: Types.ObjectId | Port;
  @prop({ required: true })
  shipId: Types.ObjectId | Ship;
  @prop({ required: true })
  arrivalOn: Date;
  @prop({ required: true })
  departureOn: Date;
  @prop({ required: true })
  miles: number;
  @prop({ required: true })
  daysAtSea: number;
  @prop({ required: true })
  daysInPort: number;
  @prop({ required: false })
  departurePort?: Port;
  @prop({ required: false })
  sailing?: Sailing;
}

export const ShipStopModel =
  mongoose.models?.ShipStop || getModelForClass(ShipStop, { schemaOptions: { timestamps: true } });

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
