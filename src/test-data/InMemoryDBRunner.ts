import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import testDataLoader from './testDataLoader';

class InMemoryDBRunner {
  public mongod = new MongoMemoryServer();

  public connectToInMemoryDBAndLoadTestData = async () => {
    try {
      await this.connectToInMemoryDBServer();
      await testDataLoader();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to connect and load test data: ', error);
    }
  };

  public connectToInMemoryDBServer = async () => {
    const uri = await this.mongod.getUri();

    //this.mongod.getInstanceInfo(); // return Object with instance data

    try {
      await mongoose.connect(uri);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Cannot connect to in-memory mongodb:', error);
    }
  };

  /**
   * Drop database, close the connection and stop mongodb.
   */
  // https://github.com/nodkz/mongodb-memory-server#travis
  // https://github.com/integrations/slack/pull/895
  public closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await Promise.all(mongoose.connections.map((con) => con.close()));
    await mongoose.disconnect();
    await this.mongod.stop();
    return;
  };
}

export default InMemoryDBRunner;
