import { ShipModel } from '@/models/Ship';
import dbConnect from '@/mongoose/mongoose';

export default class ShipService {
  private static instance: ShipService;
  private constructor() {}
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ShipService();
    return this.instance;
  }

  public getAllShips = async () => {
    await dbConnect();

    return ShipModel.find({});
  };
}

export const shipService = ShipService.getInstance();
