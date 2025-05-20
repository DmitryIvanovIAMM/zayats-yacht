'use server';

import { ShipModel } from '@/models/Ship';
import { BackendDataFetchArgs } from '@/components/Table/types';
import { mapShipsToFrontend } from '@/models/mappers';
import { shipService } from '@/services/ShipService';

export const getAllShips = async () => {
  return ShipModel.find({});
};

export const getFilteredShips = async (fetchParams: BackendDataFetchArgs) => {
  const { data, total } = await shipService.getFilteredShips(fetchParams);

  return {
    data: mapShipsToFrontend(data),
    total: total
  };
};
