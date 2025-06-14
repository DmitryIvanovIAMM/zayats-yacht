import { Port } from '@/models/Port';
import { PortFrontend } from '@/models/PortFrontend';
import { Sailing, SailingWithShipStop, SailingWithShipStopAndPort } from '@/models/Sailing';
import { ShipStop, ShipStopWithPort, ShipStopWithSailingAndPort } from '@/models/ShipStop';
import {
  ShipStopFrontend,
  ShipStopWithPortFrontend,
  ShipStopWithSailingAndPortFrontend
} from '@/models/ShipStopFrontend';
import { SailingFrontend, SailingWithShipStopAndPortsFrontend } from '@/models/SailingFrontend';
import { QuoteRequest } from '@/models/QuoteRequest';
import { QuoteRequestFrontend } from '@/models/QuoteRequestFrontend';
import { ShipFrontend } from '@/models/ShipFrontend';
import { Ship } from '@/models/Ship';
import {
  ScheduleForm,
  ShipStopForm
} from '@/components/AdminDashboard/ScheduleManagement/Schedule/types';
import { PortForm } from '@/components/AdminDashboard/AdminPorts/Port/types';

export const mapPortToFrontend = (ports: Port): PortFrontend => {
  return {
    _id: ports._id.toString(),
    portName: ports.portName,
    destinationName: ports.destinationName,
    imageFileName: ports.imageFileName
  };
};
export const mapPortsToFrontend = (ports: Port[]): PortFrontend[] => {
  return ports.map((port) => mapPortToFrontend(port));
};

export const mapPortToForm = (port: Port): PortForm => {
  return {
    portName: port.portName,
    destinationName: port.destinationName,
    imageFileName: port.imageFileName
  };
};
export const mapPortsToForm = (ports: Port[]): PortForm[] => {
  return ports.map((port) => mapPortToForm(port));
};

export const mapShipStopToFrontend = (shipStop: ShipStop): ShipStopFrontend => {
  return {
    _id: shipStop?._id.toString(),
    sailingId: shipStop.sailingId.toString(),
    portId: shipStop.portId.toString(),
    shipId: shipStop.shipId.toString(),
    arrivalOn: shipStop.arrivalOn.toISOString(),
    departureOn: shipStop.departureOn.toISOString(),
    miles: shipStop.miles,
    daysAtSea: shipStop.daysAtSea,
    daysInPort: shipStop.daysInPort
  };
};
export const mapShipStopsToFrontend = (shipStops: ShipStop[]): ShipStopFrontend[] => {
  return shipStops.map((shipStop) => mapShipStopToFrontend(shipStop));
};
export const mapShipStopToForm = (shipStop: ShipStop): ShipStopForm => {
  return {
    portId: shipStop.portId.toString(),
    arrivalOn: shipStop.arrivalOn,
    departureOn: shipStop.departureOn,
    miles: shipStop.miles
  };
};
export const mapShipStopsToForm = (shipStops: ShipStop[]): ShipStopForm[] => {
  return shipStops.map((shipStop) => mapShipStopToForm(shipStop));
};

export const mapShipStopWithPortToFrontend = (
  shipStop: ShipStopWithPort
): ShipStopWithPortFrontend => {
  return {
    _id: shipStop?._id.toString(),
    sailingId: shipStop.sailingId.toString(),
    portId: shipStop.portId.toString(),
    shipId: shipStop.shipId.toString(),
    arrivalOn: shipStop.arrivalOn.toISOString(),
    departureOn: shipStop.departureOn.toISOString(),
    miles: shipStop.miles,
    daysAtSea: shipStop.daysAtSea,
    daysInPort: shipStop.daysInPort,
    departurePort: mapPortToFrontend(shipStop.departurePort)
  };
};
export const mapShipStopsWithPortToFrontend = (
  shipStops: ShipStopWithPort[]
): ShipStopWithPortFrontend[] => {
  return shipStops.map((shipStop) => mapShipStopWithPortToFrontend(shipStop));
};

export const mapShipStopWithPortAndSailingToFrontend = (
  shipStop: ShipStopWithSailingAndPort
): ShipStopWithSailingAndPortFrontend => {
  return {
    _id: shipStop?._id.toString(),
    sailingId: shipStop.sailingId.toString(),
    portId: shipStop.portId.toString(),
    shipId: shipStop.shipId.toString(),
    arrivalOn: shipStop.arrivalOn.toISOString(),
    departureOn: shipStop.departureOn.toISOString(),
    miles: shipStop.miles,
    daysAtSea: shipStop.daysAtSea,
    daysInPort: shipStop.daysInPort,
    departurePort: mapPortToFrontend(shipStop.departurePort),
    sailing: mapSailingToFrontend(shipStop.sailing)
  };
};
export const mapShipStopsWithPortAndSailingToFrontend = (
  shipStops: ShipStopWithSailingAndPort[]
): ShipStopWithSailingAndPortFrontend[] => {
  return shipStops.map((shipStop) => mapShipStopWithPortAndSailingToFrontend(shipStop));
};
export const mapShipStopsArrayWithPortAndSailingToFrontend = (
  shipStops: ShipStopWithSailingAndPort[][]
): ShipStopWithSailingAndPortFrontend[][] => {
  return shipStops.map((shipStopArray) =>
    shipStopArray.map((shipStop) => mapShipStopWithPortAndSailingToFrontend(shipStop))
  );
};

export const mapSailingToFrontend = (sailing: Sailing): SailingFrontend => {
  return {
    _id: sailing._id.toString(),
    name: sailing.name,
    isActive: sailing.isActive
    //createdAt: sailing?.createdAt?.toISOString() ?? null,
    //updatedAt: sailing?.updatedAt?.toISOString() ?? null,
    //deletedAt: sailing?.deletedAt?.toISOString() ?? null
  } as SailingFrontend;
};
export const mapSailingsToFrontend = (sailings: Sailing[]): SailingFrontend[] => {
  return sailings.map((sailing) => mapSailingToFrontend(sailing));
};

export const mapSailingWithShipStopAndPortsToFrontend = (
  SailingWithShipStopAndPorts: SailingWithShipStopAndPort
): SailingWithShipStopAndPortsFrontend => {
  return {
    _id: SailingWithShipStopAndPorts._id.toString(),
    name: SailingWithShipStopAndPorts.name,
    isActive: SailingWithShipStopAndPorts.isActive,
    createdAt: SailingWithShipStopAndPorts?.createdAt?.toISOString() ?? null,
    updatedAt: SailingWithShipStopAndPorts?.updatedAt?.toISOString() ?? null,
    shipStops: mapShipStopsWithPortToFrontend(SailingWithShipStopAndPorts.shipStops),
    deletedAt: SailingWithShipStopAndPorts?.deletedAt?.toISOString() ?? null
  };
};
export const mapSailingsWithShipStopAndPortsToFrontend = (
  sailingsWithShipStopAndPorts: SailingWithShipStopAndPort[]
): SailingWithShipStopAndPortsFrontend[] => {
  return sailingsWithShipStopAndPorts.map((sailing) =>
    mapSailingWithShipStopAndPortsToFrontend(sailing)
  );
};

export const mapSailingWithShipStopToFrontend = (
  sailingWithShipStops: SailingWithShipStop
): ScheduleForm => {
  return {
    name: sailingWithShipStops.name,
    shipId: sailingWithShipStops?.shipStops[0].shipId.toString(),
    shipStops: mapShipStopsToForm(sailingWithShipStops.shipStops)
  };
};

export const mapQuoteRequestToFrontend = (quoteRequest: QuoteRequest): QuoteRequestFrontend => {
  return {
    _id: quoteRequest._id.toString(),
    fromUserId: quoteRequest?.fromUserId?.toString() || '',
    fromName: quoteRequest?.fromName || '',
    fromEmail: quoteRequest.fromEmail,
    receivedAt: quoteRequest.receivedAt,
    requestData: quoteRequest.requestData,
    requestObject: quoteRequest?.requestObject || {}
  };
};
export const mapQuoteRequestsToFrontend = (
  quoteRequests: QuoteRequest[]
): QuoteRequestFrontend[] => {
  return quoteRequests.map((quoteRequest) => mapQuoteRequestToFrontend(quoteRequest));
};

export const mapShipToFrontend = (ship: Ship): ShipFrontend => {
  return {
    _id: ship._id.toString(),
    name: ship.name,
    type: ship.type,
    builder: ship.builder,
    flag: ship.flag,
    homePort: ship.homePort,
    class: ship.class,
    imoNo: ship.imoNo,
    callSign: ship.callSign
  };
};
export const mapShipsToFrontend = (ships: Ship[]): ShipFrontend[] => {
  return ships.map((ship) => mapShipToFrontend(ship));
};
export const mapShipToForm = (ship: Ship): ShipFrontend => {
  return {
    _id: ship._id.toString(),
    name: ship.name,
    type: ship.type,
    builder: ship.builder,
    flag: ship.flag,
    homePort: ship.homePort,
    class: ship.class,
    imoNo: ship.imoNo,
    callSign: ship.callSign
  };
};
export const mapShipsToForm = (ships: Ship[]): ShipFrontend[] => {
  return ships.map((ship) => mapShipToForm(ship));
};
