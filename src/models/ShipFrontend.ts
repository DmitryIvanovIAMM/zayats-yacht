export interface ShipFrontend {
  _id: string;
  name: string;
  type: string;
  builder: string;
  flag: string;
  homePort: string;
  class: string;
  imoNo: string;
  callSign: string;
}

export const shipFields = [
  '_id',
  'name',
  'type',
  'builder',
  'flag',
  'homePort',
  'class',
  'imoNo',
  'callSign'
];
