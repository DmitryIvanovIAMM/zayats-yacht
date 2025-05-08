import { Port, PortModel } from '@/models/Port';
import logger from '@/modules/logger/logger';

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
    logger.info('getAllPorts()');
    try {
      return PortModel.find({}).lean<Port[]>();
    } catch {
      return [];
    }
  };
}

export const portService = PortService.getInstance();
