import Ship from '../models/Ship';

export default class ShipService {

  public getAllShips = () => {
    return  Ship.find({});
  };

}
