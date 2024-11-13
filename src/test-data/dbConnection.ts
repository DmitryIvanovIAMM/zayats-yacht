import * as mongoose from 'mongoose';
import logger from '../../utils/logger';
import { config } from '../../config';

export default async function dbConnection() {
  const { MONGODB_URI } = config;
  await mongoose
    .connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    .then(() => {
      // TODO Do not log Mongo URL as it contains password
      logger.info(`MongoDB successfully to ${MONGODB_URI}`);
    })
    .catch((err) => logger.error(`Failed to connect to ${MONGODB_URI}: ` + err));
}
