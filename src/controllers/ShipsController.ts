import { ShipModel } from '@/models/Ship';

export const getAllShips = async () => {
  return ShipModel.find({});
};
