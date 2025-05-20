'use server';

import { Ship, ShipModel } from '@/models/Ship';
import { BackendDataFetchArgs } from '@/components/Table/types';
import { mapShipsToFrontend } from '@/models/mappers';
import { shipService } from '@/services/ShipService';
import { ShipForm } from '@/components/AdminDashboard/AdminShips/Ship/types';
import { ActionResult } from '@/utils/types';
import { Messages } from '@/helpers/messages';
import { User } from '@/models/User';
import { Types } from 'mongoose';

export const getAllShips = async () => {
  return shipService.getAllShips();
};

export const getFilteredShips = async (fetchParams: BackendDataFetchArgs) => {
  const { data, total } = await shipService.getFilteredShips(fetchParams);

  return {
    data: mapShipsToFrontend(data),
    total: total
  };
};

export const addShip = async (user: User, shipForm: ShipForm): Promise<ActionResult> => {
  console.log('addShip().  shipForm: ', shipForm);
  try {
    const Ship: Ship = {
      _id: new Types.ObjectId(),
      name: shipForm.name,
      type: shipForm.type,
      builder: shipForm.builder,
      flag: shipForm.flag,
      homePort: shipForm.homePort,
      class: shipForm.class,
      imoNo: shipForm.imoNo,
      callSign: shipForm.callSign
    };
    shipService.addShip(Ship);
    return { success: true, message: Messages.ShipAddedSuccessfully };
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('Error while adding ship: ', error);
    return { success: false, message: error?.message || Messages.FailedAddShip };
  }
};
