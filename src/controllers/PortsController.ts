'use server';

import { scheduleService } from '@/services/ScheduleService';
import { portService } from '@/services/PortService';
import { Port } from '@/models/Port';
import { ShipStop } from '@/models/ShipStop';
import { BackendDataFetchArgs } from '@/components/Table/types';
import { mapPortsToFrontend } from '@/models/mappers';

export const getActivePorts = async () => {
  try {
    const ports: Port[] = await portService.getAllPorts();
    const shipStops: ShipStop[] = await scheduleService.getActiveShipStops();
    const usedPortsId: string[] = shipStops.map((shipStop) => shipStop.portId.toString());
    const uniqueUsedPortsIds = Array.from(new Set(usedPortsId));
    const usedPorts: Port[] = ports.filter(
      (port) => uniqueUsedPortsIds.indexOf(port._id.toString()) > -1
    );

    return {
      ports: mapPortsToFrontend(usedPorts),
      message: null
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error while fetching ports: ', err);
    //logger.info(err);
    return { ports: [], destinations: [], message: 'Error while fetching ports' };
  }
};

export const getFilteredPorts = async (fetchParams: BackendDataFetchArgs) => {
  const { data, total } = await portService.getFilteredPorts(fetchParams);

  return {
    data: mapPortsToFrontend(data),
    total: total
  };
};
