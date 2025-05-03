import { Port, PortModel } from '@/models/Port';

export default class PortService {
  private static instance: PortService;
  private constructor() {}
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new PortService();
    return this.instance;
  }

  public getAllPorts = async (): Promise<Port[]> => {
    try {
      return PortModel.find({}).lean<Port[]>();
    } catch {
      return [];
    }
  };
}

export const portService = PortService.getInstance();
