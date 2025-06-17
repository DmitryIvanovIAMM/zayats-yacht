import { models, Types } from 'mongoose';
import { Port } from '@/models/Port';
import { Ship } from '@/models/Ship';
import { Sailing } from '@/models/Sailing';
import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';

@modelOptions({
  options: { allowMixed: Severity.ALLOW, customName: 'ShipStop' },
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
  @prop({ required: true, default: 0 })
  spacePrice: number;
  @prop({ required: true, default: 0 })
  insuranceCoefficient: number;
}

export const ShipStopModel = models?.ShipStop || getModelForClass(ShipStop);

export class ShipStopWithPort extends ShipStop {
  departurePort: Port;
}

export class ShipStopWithSailingAndPort extends ShipStop {
  sailing: Sailing;
  departurePort: Port;
}
