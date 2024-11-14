import * as seedData from './seedData';
import { SAILINGS_2020 } from './sailings';
import { UserModel } from '@/models/User';
import { ShipModel } from '@/models/Ship';
import { ShipStopModel } from '@/models/ShipStop';
import { PortModel } from '@/models/Port';
import { SailingModel } from '@/models/Sailing';

/* eslint-disable no-console */
export default async function testDataLoader() {
  console.log('Loading Test Data mode...');

  await UserModel.deleteMany({})
    .then(() => console.log('Current User collection was removed.'))
    .catch((err) => console.log('Error removing User collection: ' + err));

  await UserModel.insertMany(seedData.USERS.map((item) => new UserModel(item)))
    .then(() => console.log('New Users inserted into DB.'))
    .catch((err) => console.log('Failed to save new Users into test data.  Error: ' + err));

  await ShipModel.deleteMany({})
    .then(() => console.log('Current Ship.ts collection was removed.'))
    .catch((err) => console.log('Error removing Ship.ts collection: ' + err));
  await ShipModel.insertMany(seedData.SHIPS.map((item) => new ShipModel(item)))
    .then(() => console.log('New Ships inserted into DB.'))
    .catch((err) => console.log('Failed to save new Users into test data.  Error: ' + err));

  await ShipStopModel.deleteMany({})
    .then(() => console.log('Current ShipStop collection was removed.'))
    .catch((err) => console.log('Error removing ShipStop collection: ' + err));
  await ShipStopModel.insertMany(seedData.SHIP_STOPS.map((item) => new ShipStopModel(item)))
    .then(() => console.log('New ShipStop inserted into DB.'))
    .catch((err) => console.log('Failed to save new ShipStop into test data.  Error: ' + err));

  // remove existed test data in Port collection
  await PortModel.deleteMany({})
    .then(() => console.log('Current Port collection was removed.'))
    .catch((err) => console.log('Error removing Port collection: ' + err));

  await PortModel.insertMany(seedData.PORTS.map((item) => new PortModel(item)))
    .then(() => console.log('New Ports inserted into DB.'))
    .catch((err) => console.log('Failed to save new Ports into test data.  Error: ' + err));

  // remove existed test data in Sailing collection
  await SailingModel.deleteMany({})
    .then(() => console.log('Current Sailing collection was removed.'))
    .catch((err) => console.log('Error removing Sailing collection: ' + err));

  await SailingModel.insertMany(SAILINGS_2020.map((item) => new SailingModel(item)))
    .then(() => console.log('New Sailings inserted into DB.'))
    .catch((err) => {
      console.log('Failed to save new Sailings into test data.  Error: ' + err);
    });

  console.log('Test Data loaded successfully.');
}
