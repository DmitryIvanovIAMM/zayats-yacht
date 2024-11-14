import { ShipModel } from '../models/Ship';

export default class ShipService {
  public getAllShips = () => {
    return ShipModel.find({});
  };
}
