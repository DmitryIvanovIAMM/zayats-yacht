'use server';

import { getActivePorts, getFilteredPorts } from '@/controllers/PortsController';
import { User } from '@/models/User';
import { ActionData, ActionResult, ActionTableData, emptyTableData, Roles } from '@/utils/types';
import { PortFrontend } from '@/models/PortFrontend';
import { Messages } from '@/helpers/messages';
import { ShipStopWithSailingAndPort } from '@/models/ShipStopFrontend';
import { getSchedules, queryNearestShippings } from '@/controllers/SchedulesController';
import { ShipsParametersFlat } from '@/models/types';
import { QuoteRequestForm } from '@/components/QuoteRequest/types';
import { withServerAuth } from '@/utils/auth/withServerAuth';
import { sendQuoteRequest } from '@/controllers/EmailsController';
import { QuoteRequestFrontend } from '@/models/QuoteRequestFrontend';
import { getQuoteRequests } from '@/controllers/QuoteRequestsController';
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

export async function getQuoteRequestsAction(
  fetchParams: BackendDataFetchArgs
): Promise<ActionTableData<QuoteRequestFrontend>> {
  // eslint-disable-next-line no-console
  console.log('getQuoteRequestsAction().  fetchParams: ', fetchParams);

  try {
    const getQuoteRequestsFromDB = async (
      user: User,
      fetchParams: BackendDataFetchArgs
    ): Promise<ActionTableData<QuoteRequestFrontend>> => {
      const quoteRequests = await getQuoteRequests(fetchParams);
      return {
        success: true,
        data: quoteRequests
      };
    };

    return (await withServerAuth<QuoteRequestFrontend>(
      [Roles.Admin],
      getQuoteRequestsFromDB,
      fetchParams
    )) as ActionTableData<QuoteRequestFrontend>;
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('Error while fetching quote requests: ', error);
    return {
      success: false,
      data: emptyTableData,
      message: error?.message || Messages.FailedGetQuoteRequests
    };
  }
}

export async function getPortsAction(
  fetchParams: BackendDataFetchArgs
): Promise<ActionTableData<PortFrontend>> {
  // eslint-disable-next-line no-console
  console.log('getPortsAction().  fetchParams: ', fetchParams);

  try {
    const getPortsFromDB = async (
      user: User,
      fetchParams: BackendDataFetchArgs
    ): Promise<ActionTableData<PortFrontend>> => {
      const ports = await getFilteredPorts(fetchParams);
      return {
        success: true,
        data: ports
      };
    };

    return (await withServerAuth<PortFrontend>(
      [Roles.Admin],
      getPortsFromDB,
      fetchParams
    )) as ActionTableData<PortFrontend>;
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('Error while fetching ports: ', error);
    return {
      success: false,
      data: emptyTableData,
      message: error?.message || Messages.FailedGetPorts
    };
  }
}
