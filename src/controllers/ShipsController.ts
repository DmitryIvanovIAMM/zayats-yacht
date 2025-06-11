'use server';

import { Ship } from '@/models/Ship';
import { BackendDataFetchArgs } from '@/components/Table/types';
import { mapShipsToFrontend, mapShipToForm } from '@/models/mappers';
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

export const getActiveShipsOptions = async (): Promise<ActionData<Record<string, string>>> => {
  try {
    const ships = await shipService.getActiveShips();
    const shipsOptions: Record<string, string> = {};
    ships.forEach((ship) => {
      shipsOptions[ship._id.toString()] = ship.name;
    });

    return {
      success: true,
      data: shipsOptions
    };
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('getActiveShips().  Error while fetching ships: ', error);
    return {
      success: false,
      message: error?.message || Messages.FailedGetShips,
      data: {}
    };
  }
};

export const getShip = async (user: User, _id: string): Promise<ActionData<ShipForm | null>> => {
  try {
    const ship = await shipService.getShipFromDB(_id);
    if (!ship) {
      return { success: false, message: Messages.ShipNotFound, data: null };
    }

    return { success: true, data: mapShipToForm(ship) };
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('Error while fetching ship: ', error);
    return { success: false, message: error?.message || Messages.FailedGetShip, data: null };
  }
};

export const addShip = async (user: User, shipForm: ShipForm): Promise<ActionResult> => {
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

export const deleteShip = async (user: User, shipId: string): Promise<ActionResult> => {
  try {
    await shipService.softDeleteShipFromDB(shipId, user);
    return { success: true, message: Messages.ShipDeletedSuccessfully };
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('Error while deleting ship: ', error);
    return { success: false, message: error?.message || Messages.FailedDeleteShip };
  }
};
