'use server';

import { scheduleService } from '@/services/ScheduleService';
import { portService } from '@/services/PortService';
import { Port } from '@/models/Port';
import { ShipStop } from '@/models/ShipStop';
import logger from '../../logger';

export const getPorts = async () => {
  try {
    const ports: Port[] = await portService.getAllPorts();
    const shipStops: ShipStop[] = await scheduleService.getActiveShipStops();
    const usedPortsId: string[] = shipStops.map((shipStop) => shipStop.portId.toString());
    const uniqueUsedPortsIds = Array.from(new Set(usedPortsId));
    const usedPorts: Port[] = ports.filter(
      (port) => uniqueUsedPortsIds.indexOf(port._id.toString()) > -1
    );

    return {
      ports: JSON.parse(JSON.stringify(usedPorts)),
      message: null
    };
  } catch (err) {
    logger.info(err);
    return { ports: [], destinations: [], message: 'Error while fetching ports' };
  }
};
