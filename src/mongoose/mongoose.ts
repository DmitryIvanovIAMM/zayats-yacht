import * as mongoose from 'mongoose';
import logger from '../../logger';

const { MONGODB_URI } = process.env;
// eslint-disable-next-line no-console
console.log('MONGODB_URI: ', MONGODB_URI);
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local.old');
}

const connection: { isConnected?: number } = {};

async function dbConnect() {
  logger.info('dbConnect() starting...');
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI as string);
    connection.isConnected = db.connections[0].readyState;
    // eslint-disable-next-line no-console
    console.log(`MongoDB successfully connected to ${MONGODB_URI}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to connect to ${MONGODB_URI}: ` + error);
    throw new Error(`Failed to connect to ${MONGODB_URI}: ` + error);
  }
}

export default dbConnect;
