import { Port, PortModel } from '@/models/Port';
import mongoose from 'mongoose';

export default class PortService {
  public getAllPorts = async (): Promise<Port[]> => {
    try {
      const { MONGODB_URI } = process.env;
      const db = await mongoose.connect(MONGODB_URI as string)
      // eslint-disable-next-line no-console
      console.log('MONGODB_URI: ', MONGODB_URI);

      return PortModel.find({}).lean<Port[]>();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to connect and load test data: ', error);
    }
  }
}

export const portService = new PortService();
