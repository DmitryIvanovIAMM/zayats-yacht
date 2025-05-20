'use server';

import { Ship, ShipModel } from '@/models/Ship';
import { BackendDataFetchArgs } from '@/components/Table/types';
import { mapShipsToFrontend } from '@/models/mappers';
import { shipService } from '@/services/ShipService';
import { ShipForm } from '@/components/AdminDashboard/AdminShips/Ship/types';
import { ActionData, ActionResult } from '@/utils/types';
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

export const getShip = async (user: User, id: string): Promise<ActionData<ShipForm | null>> => {
  const ship = await shipService.getShipFromDB(id);
  if (!ship) {
    return { success: false, message: Messages.ShipNotFound, data: null };
  }
  const shipForm: ShipForm = {
    name: ship.name,
    type: ship.type,
    builder: ship.builder,
    flag: ship.flag,
    homePort: ship.homePort,
    class: ship.class,
    imoNo: ship.imoNo,
    callSign: ship.callSign
  };
  return { success: true, data: shipForm };
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
    shipService.addShipInDB(Ship);
    return { success: true, message: Messages.ShipAddedSuccessfully };
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('Error while adding ship: ', error);
    return { success: false, message: error?.message || Messages.FailedAddShip };
  }
};

export const updateShip = async (
  user: User,
  shipForm: ShipForm & { _id: string }
): Promise<ActionResult> => {
  console.log('updateShip().  shipForm: ', shipForm);
  try {
    const Ship: Ship = {
      _id: new Types.ObjectId(shipForm._id),
      name: shipForm.name,
      type: shipForm.type,
      builder: shipForm.builder,
      flag: shipForm.flag,
      homePort: shipForm.homePort,
      class: shipForm.class,
      imoNo: shipForm.imoNo,
      callSign: shipForm.callSign
    };
    await shipService.updateShipInDB(shipForm._id, Ship);
    return { success: true, message: Messages.ShipUpdatedSuccessfully };
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('Error while updating ship: ', error);
    return { success: false, message: error?.message || Messages.FailedUpdateShip };
  }
};
