import { ShipStopFrontend, ShipStopWithPortFrontend } from '@/models/ShipStopFrontend';

export interface SailingFrontend {
  _id: string | null;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const sailingFrontendFields = ['_id', 'name'];

export interface SailingWithShipStopAndPortsFrontend extends SailingFrontend {
  shipStops: ShipStopWithPortFrontend[];
}
