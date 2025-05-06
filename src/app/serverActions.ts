'use server';

import { getActivePorts } from '@/controllers/PortsController';
import { LongActionData, LongActionResult, Roles } from '@/utils/types';
import { PortFrontend } from '@/models/Port';
import { Messages } from '@/helpers/messages';
import { ShipStopWithSailingAndPort } from '@/models/ShipStop';
import { getSchedules, queryNearestShippings } from '@/controllers/SchedulesController';
import { ShipsParametersFlat } from '@/models/types';
import { QuoteRequestForm } from '@/components/QuoteRequest/types';
import { withServerAuth } from '@/utils/auth/withServerAuth';
import { sendQuoteRequest } from '@/controllers/EmailsController';
import { QuoteRequestFrontend } from '@/models/QuoteRequest';
import { getQuoteRequests } from '@/controllers/QuoteRequestsController';

export async function getActivePortsAction(): Promise<LongActionData<PortFrontend[]>> {
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
): Promise<LongActionData<ShipStopWithSailingAndPort[][]>> {
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
): Promise<LongActionData<ShipStopWithSailingAndPort[][]>> {
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
): Promise<LongActionResult> {
  // eslint-disable-next-line no-console
  console.log('sendQuoteRequestAction().  quoteRequest: ', quoteRequest);
  return await withServerAuth([Roles.Admin, Roles.User], sendQuoteRequest, quoteRequest);
}

export async function getQuoteRequestsAction(): Promise<LongActionData<QuoteRequestFrontend[]>> {
  // eslint-disable-next-line no-console
  console.log('getQuoteRequestsAction().  quoteRequest: ');

  try {
    const getQuoteRequestsFromDB = async (): Promise<LongActionData<QuoteRequestFrontend[]>> => {
      const quoteRequests: QuoteRequestFrontend[] = await getQuoteRequests();
      return {
        success: true,
        data: quoteRequests
      };
    };

    return (await withServerAuth<QuoteRequestFrontend[]>(
      [Roles.Admin],
      getQuoteRequestsFromDB
    )) as LongActionData<QuoteRequestFrontend[]>;
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('Error while fetching quote requests: ', error);
    return { success: false, data: [], message: error?.message || Messages.FailedGetQuoteRequests };
  }
}
