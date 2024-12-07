import { Port, PortModel } from '@/models/Port';

export default class PortService {
  public getAllPorts = async (): Promise<Port[]> => {
    const { MONGODB_URI } = process.env;
    // eslint-disable-next-line no-console
    console.log('MONGODB_URI: ', MONGODB_URI);
    console.log('MONGODB_URI: ', MONGODB_URI);

    return PortModel.find({}).lean<Port[]>();
  };
}

export const portService = new PortService();
