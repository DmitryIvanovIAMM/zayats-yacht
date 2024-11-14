import * as ids from './ids';
import { REGULAR_SHIP_STOPS_2020 } from './regularShipStops_2020';
import { ALASKA_YACHTING_SHIP_STOPS_2020 } from './alaskaYachtingAdventure_2020';

export const USERS = [
  {
    _id: '41224d776a326fb40f000001',
    name: 'Dmitry',
    email: 'Ivanov',
    password: 'cap'
  },
  {
    _id: '41224d776a326fb40f000002',
    name: 'Ruslan',
    email: 'Kharitonov',
    password: 'cap'
  },
  {
    _id: '41224d776a326fb40f000003',
    name: 'Customer2',
    email: 'Customer2',
    password: 'cap'
  },
  {
    _id: '41224d776a326fb40f000004',
    name: 'Customer3',
    email: 'Customer3',
    password: 'test'
  },
  {
    _id: '41224d776a326fb40f000005',
    name: 'Customer4',
    email: 'Customer4',
    password: 'test'
  }
];

export const SHIPS = [
  {
    _id: ids.industrialGuideShipId,
    name: 'INDUSTRIAL GUIDE',
    type: 'Heavy Lift Vessel',
    builder: 'Hudong',
    flag: 'Liberia',
    homePort: 'Monrovia',
    class: 'GL + 100 A 5 E 3',
    imoNo: '9424572',
    callSign: 'A8XD3'
  },
  {
    _id: ids.mVIndustrialGraceShipId,
    name: 'MV Industrial Grace',
    type: 'Heavy Lift Vessel',
    builder: 'Hudong',
    flag: 'Liberia',
    homePort: 'Monrovia',
    class: 'GL + 100 A 5 E 3',
    imoNo: '9424572',
    callSign: 'A8XD3'
  }
];

export const PORTS = [
  {
    _id: ids.fortLauderdalePortId,
    portName: 'Fort Lauderdale, Florida',
    destinationName: 'East Coast North America',
    imageFileName: 'FortLauderdale.jpg'
  },
  {
    _id: ids.palmaDeMallorcaPortId,
    portName: 'Palma de Mallorca, Spain',
    destinationName: 'Mediterranean',
    imageFileName: 'PalmaDeMallorca.jpg'
  },
  {
    _id: ids.genoaPortId,
    portName: 'Genoa, Italy',
    destinationName: 'Mediterranean',
    imageFileName: 'Genoa.jpg'
  },
  {
    _id: ids.fethiyePortId,
    portName: 'Fethiye, Turkey',
    destinationName: 'Mediterranean',
    imageFileName: 'FethiyeTurkey.jpg'
  },
  {
    _id: ids.hongKongPortId,
    portName: 'Hong Kong',
    destinationName: 'Asia',
    imageFileName: 'HongKong.jpg'
  },
  {
    _id: ids.victoriaPortId,
    portName: 'Victoria, British Columbia',
    destinationName: 'West Coast North America',
    imageFileName: 'Victoria.jpg'
  },
  {
    _id: ids.ensenadaPortId,
    portName: 'Ensenada, Mexico',
    destinationName: 'West Coast North America',
    imageFileName: 'Ensenada.jpg'
  },
  {
    _id: ids.golfitoPortId,
    portName: 'Golfito, Costa Rica',
    destinationName: 'Central America',
    imageFileName: 'Golfito.jpg'
  },
  {
    _id: ids.tortolaPortId,
    portName: 'Tortola, British Virgin Islands',
    destinationName: 'Caribbean',
    imageFileName: 'Tortola.jpg'
  },
  {
    _id: ids.colonPortId,
    portName: 'Colon, Panama',
    destinationName: 'Central America',
    imageFileName: 'Colon.jpg'
  },
  {
    _id: ids.palmBeachPortId,
    portName: 'Palm Beach, Florida',
    destinationName: 'East Coast North America',
    imageFileName: 'PalmBeach.jpg'
  },
  {
    _id: ids.laPazPortId,
    portName: 'La Paz, Mexico',
    destinationName: 'West Coast North America',
    imageFileName: 'LaPaz.jpg'
  }
];

export const SHIP_STOPS = [
  ...REGULAR_SHIP_STOPS_2020,
  ...ALASKA_YACHTING_SHIP_STOPS_2020
];
