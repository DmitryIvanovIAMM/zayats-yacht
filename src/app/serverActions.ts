'use server';

import {
  addPort,
  deletePort,
  getActivePorts,
  getPort,
  updatePort
} from '@/controllers/PortsController';
import { User } from '@/models/User';
import {
  ActionData,
  ActionResult,
  ActionTableData,
  emptyTableData,
  Roles,
  SailingStatusParams,
  TableData
} from '@/utils/types';
import { PortFrontend } from '@/models/PortFrontend';
import { Messages } from '@/helpers/messages';
import { ShipStopWithSailingAndPort } from '@/models/ShipStopFrontend';
import {
  deleteSailing,
  getSchedules,
  queryNearestShippings,
  updateSailingActivityStatus
} from '@/controllers/SchedulesController';
import { ShipsParametersFlat } from '@/models/types';
import { QuoteRequestForm } from '@/components/QuoteRequest/types';
import { withServerAuth } from '@/utils/auth/withServerAuth';
import { sendQuoteRequest } from '@/controllers/EmailsController';
import { BackendDataFetchArgs } from '@/components/Table/types';
import { ShipForm } from '@/components/AdminDashboard/AdminShips/Ship/types';
import { addShip, deleteShip, getShip, updateShip } from '@/controllers/ShipsController';
import { PortForm } from '@/components/AdminDashboard/AdminPorts/Port/types';

export async function getActivePortsAction(): Promise<ActionData<PortFrontend[]>> {
  try {
    const ports = await getActivePorts();
    // eslint-disable-next-line no-console
    console.log('getActivePortsAction(). ports: ', ports);
    // force
    return {
      success: true,
      data: ports.ports as PortFrontend[]
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error while fetching ports: ', error);
    return { success: false, data: [], message: Messages.FailedGetPorts };
  }
}

export async function queryNearestShippingsAction(
  date: Date | string
): Promise<ActionData<ShipStopWithSailingAndPort[][]>> {
  try {
    const schedule = await queryNearestShippings(date);
    return {
      success: true,
      data: schedule as unknown as ShipStopWithSailingAndPort[][]
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error while fetching nearest shippings: ', error);
    return { success: false, data: [], message: Messages.FailedGetNearestShippings };
  }
}

export async function getSchedulesAction(
  shipData: ShipsParametersFlat
): Promise<ActionData<ShipStopWithSailingAndPort[][]>> {
  try {
    const schedules = await getSchedules(shipData);
    return {
      success: true,
      data: schedules as unknown as ShipStopWithSailingAndPort[][]
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error while fetching schedules: ', error);
    return { success: false, data: [], message: Messages.FailedGetSchedules };
  }
}

export async function sendQuoteRequestAction(
  quoteRequest: QuoteRequestForm
): Promise<ActionResult> {
  // eslint-disable-next-line no-console
  console.log('sendQuoteRequestAction().  quoteRequest: ', quoteRequest);
  return await withServerAuth([Roles.Admin, Roles.User], sendQuoteRequest, quoteRequest);
}

export async function getBackendDataByAdminAction<T>(
  fetchParams: BackendDataFetchArgs,
  getFunction: (fetchParams: BackendDataFetchArgs) => Promise<TableData<T>>,
  message: string = Messages.FailedGetData
): Promise<ActionTableData<T>> {
  // eslint-disable-next-line no-console
  console.log('getBackendDataByAdminAction().  fetchParams: ', fetchParams);

  try {
    const queryDataFromDB = async (
      user: User,
      fetchParams: BackendDataFetchArgs
    ): Promise<ActionTableData<T>> => {
      const dataFromDB = await getFunction(fetchParams);
      return {
        success: true,
        data: dataFromDB
      };
    };

    return (await withServerAuth<T>(
      [Roles.Admin],
      queryDataFromDB,
      fetchParams
    )) as ActionTableData<T>;
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('Error while fetching backend data: ', error);
    return {
      success: false,
      data: emptyTableData,
      message: error?.message || message
    };
  }
}

export async function setSailingActivityByAdminStatus(
  data: SailingStatusParams
): Promise<ActionResult> {
  // eslint-disable-next-line no-console
  console.log('setSailingActivityByAdminStatus(). data: ', data);

  return (await withServerAuth([Roles.Admin], updateSailingActivityStatus, data)) as ActionResult;
}

export async function deleteSailingByAdminAction(sailingId: string): Promise<ActionResult> {
  // eslint-disable-next-line no-console
  console.log('deleteSailingByAdminAction(). sailingId: ', sailingId);

  return (await withServerAuth([Roles.Admin], deleteSailing, sailingId)) as ActionResult;
}

export async function getShipByAdminAction(id: string): Promise<ActionData<ShipForm>> {
  // eslint-disable-next-line no-console
  console.log('getShipByAdminAction(). id: ', id);

  return (await withServerAuth([Roles.Admin], getShip, id)) as ActionData<ShipForm>;
}

export async function addShipByAdminAction(shipData: ShipForm): Promise<ActionResult> {
  // eslint-disable-next-line no-console
  console.log('addShipByAdminAction(). shipData: ', shipData);

  return (await withServerAuth([Roles.Admin], addShip, shipData)) as ActionResult;
}

export async function updateShipByAdminAction(
  shipId: string,
  shipData: ShipForm
): Promise<ActionResult> {
  // eslint-disable-next-line no-console
  console.log('updateShipByAdminAction(). shipId: ', shipId, ' shipData: ', shipData);

  return (await withServerAuth([Roles.Admin], updateShip, {
    ...shipData,
    _id: shipId
  })) as ActionResult;
}

export async function deleteShipByAdminAction(shipId: string): Promise<ActionResult> {
  // eslint-disable-next-line no-console
  console.log('deleteShipByAdminAction(). shipId: ', shipId);

  return (await withServerAuth([Roles.Admin], deleteShip, shipId)) as ActionResult;
}

export const getPortByAdminAction = async (id: string): Promise<ActionData<PortForm>> => {
  // eslint-disable-next-line no-console
  console.log('getPortByAdminAction(). id: ', id);

  return (await withServerAuth([Roles.Admin], getPort, id)) as ActionData<PortForm>;
};

export async function addPortByAdminAction(portData: any): Promise<ActionResult> {
  // eslint-disable-next-line no-console
  console.log('addPortByAdminAction(). portData: ', portData);

  return (await withServerAuth([Roles.Admin], addPort, portData)) as ActionResult;
}

export async function updatePortByAdminAction(
  portId: string,
  portData: any
): Promise<ActionResult> {
  // eslint-disable-next-line no-console
  console.log('updatePortByAdminAction(). portId: ', portId, ' portData: ', portData);

  return (await withServerAuth([Roles.Admin], updatePort, {
    ...portData,
    _id: portId
  })) as ActionResult;
}

export async function deletePortByAdminAction(portId: string): Promise<ActionResult> {
  // eslint-disable-next-line no-console
  console.log('deletePortByAdminAction(). portId: ', portId);

  return (await withServerAuth([Roles.Admin], deletePort, portId)) as ActionResult;
}
