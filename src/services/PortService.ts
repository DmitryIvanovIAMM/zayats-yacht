import { Port, PortModel } from '@/models/Port';

export default class PortService {
  public getAllPorts = async (): Promise<Port[]> => {
    return PortModel.find({}).lean<Port[]>();
  };
}

export const portService = new PortService();
