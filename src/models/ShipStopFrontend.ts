import { PortFrontend } from '@/models/PortFrontend';
import { SailingFrontend } from '@/models/SailingFrontend';

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

export interface ShipStopWithPortFrontend {
  sailingId: string;
  portId: string;
  port: PortFrontend;
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
