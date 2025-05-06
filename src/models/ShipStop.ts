import mongoose, { Types } from 'mongoose';
import { Port } from '@/models/Port';
import { Ship } from '@/models/Ship';
import { Sailing } from '@/models/Sailing';
import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: { timestamps: true, collection: 'shipstops' }
})
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

export const ShipStopModel = mongoose.models?.ShipStop || getModelForClass(ShipStop);
