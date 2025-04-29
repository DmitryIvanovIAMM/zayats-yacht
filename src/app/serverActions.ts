'use server';
import { getActivePorts } from '@/controllers/PortsController';
import { LongActionResult } from '@/utils/types';
import { PortFrontend } from '@/models/Port';
import { Messages } from '@/helpers/messages';
import { ShipStopWithSailingAndPort } from '@/models/ShipStop';
import { getSchedules, queryNearestShippings } from '@/controllers/SchedulesController';
import { ShipsParametersFlat } from '@/models/types';

export async function getActivePortsAction(): Promise<LongActionResult<PortFrontend[]>> {
  try {
    const ports = await getActivePorts();
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
): Promise<LongActionResult<ShipStopWithSailingAndPort[][]>> {
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
): Promise<LongActionResult<ShipStopWithSailingAndPort[][]>> {
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
