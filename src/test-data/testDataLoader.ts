import * as seedData from './seedData';
import { SAILINGS_2020 } from './sailings';
import User from '@/models/User';
import logger from '../../logger';
import Ship from '@/models/Ship';
import ShipStop from '@/models/ShipStop';
import Port from '@/models/Port';
import Sailing from '@/models/Sailing';

export default async function testDataLoader() {
  logger.info('Loading Test Data mode...');

  await User.deleteMany({})
    .then(() => logger.info('Current User collection was removed.'))
    .catch((err) => logger.error('Error removing User collection: ' + err));

  await User.insertMany(seedData.USERS.map((item) => new User(item)))
    .then(() => logger.info('New Users inserted into DB.'))
    .catch((err) => logger.error('Failed to save new Users into test data.  Error: ' + err));

  await Ship.deleteMany({})
    .then(() => logger.info('Current Ship.ts collection was removed.'))
    .catch((err) => logger.error('Error removing Ship.ts collection: ' + err));
  await Ship.insertMany(seedData.SHIPS.map((item) => new Ship(item)))
    .then(() => logger.info('New Ships inserted into DB.'))
    .catch((err) => logger.error('Failed to save new Users into test data.  Error: ' + err));

  await ShipStop.deleteMany({})
    .then(() => logger.info('Current ShipStop collection was removed.'))
    .catch((err) => logger.error('Error removing ShipStop collection: ' + err));
  await ShipStop.insertMany(seedData.SHIP_STOPS.map((item) => new ShipStop(item)))
    .then(() => logger.info('New ShipStop inserted into DB.'))
    .catch((err) => logger.error('Failed to save new ShipStop into test data.  Error: ' + err));

  // remove existed test data in Port collection
  await Port.deleteMany({})
    .then(() => logger.info('Current Port collection was removed.'))
    .catch((err) => logger.error('Error removing Port collection: ' + err));

  await Port.insertMany(seedData.PORTS.map((item) => new Port(item)))
    .then(() => logger.info('New Ports inserted into DB.'))
    .catch((err) => logger.error('Failed to save new Ports into test data.  Error: ' + err));

  // remove existed test data in Sailing collection
  await Sailing.deleteMany({})
    .then(() => logger.info('Current Sailing collection was removed.'))
    .catch((err) => logger.error('Error removing Sailing collection: ' + err));

  await Sailing.insertMany(SAILINGS_2020.map((item) => new Sailing(item)))
    .then(() => logger.info('New Sailings inserted into DB.'))
    .catch((err) => {
      logger.error('Failed to save new Sailings into test data.  Error: ' + err);
    });

  logger.info('Test Data loaded successfully.');
}
