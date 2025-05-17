'use server';

import { getActivePorts } from '@/controllers/PortsController';
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

export async function getBackendDataAction<T>(
  fetchParams: BackendDataFetchArgs,
  getFunction: (fetchParams: BackendDataFetchArgs) => Promise<TableData<T>>,
  message: string = Messages.FailedGetData
): Promise<ActionTableData<T>> {
  // eslint-disable-next-line no-console
  console.log('getBackendDataAction().  fetchParams: ', fetchParams);

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

export async function setSailingActivityStatus(data: SailingStatusParams): Promise<ActionResult> {
  // eslint-disable-next-line no-console
  console.log('changeScheduleStatusAction(). data: ', data);

  return (await withServerAuth([Roles.Admin], updateSailingActivityStatus, data)) as ActionResult;
}

export async function deleteSailingAction(sailingId: string): Promise<ActionResult> {
  // eslint-disable-next-line no-console
  console.log('deleteSailingAction(). sailingId: ', sailingId);

  return (await withServerAuth([Roles.Admin], deleteSailing, sailingId)) as ActionResult;
}
