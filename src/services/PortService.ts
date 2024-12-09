import { Port, PortModel } from '@/models/Port';
import dbConnect from '@/mongoose/mongoose';

export default class PortService {
  public getAllPorts = async (): Promise<Port[]> => {
    try {
      await dbConnect();

      return PortModel.find({}).lean<Port[]>();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to connect and load test data: ', error);
      return [];
    }
  };
}

export const portService = new PortService();
