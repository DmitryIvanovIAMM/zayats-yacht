'use server';

import { scheduleService } from '@/services/ScheduleService';
import { portService } from '@/services/PortService';
import { Port } from '@/models/Port';
import { ShipStop } from '@/models/ShipStop';

export const getActivePorts = async () => {
  try {
    const ports: Port[] = await portService.getAllPorts();

    // eslint-disable-next-line no-console
    console.log('getActivePorts(). ports: ', ports);
    const shipStops: ShipStop[] = await scheduleService.getActiveShipStops();
    // eslint-disable-next-line no-console
    console.log('getActivePorts(). shipStops: ', shipStops);
    const usedPortsId: string[] = shipStops.map((shipStop) => shipStop.portId.toString());
    // eslint-disable-next-line no-console
    console.log('getActivePorts(). usedPortsId: ', usedPortsId);
    const uniqueUsedPortsIds = Array.from(new Set(usedPortsId));
    // eslint-disable-next-line no-console
    console.log('getActivePorts(). uniqueUsedPortsIds: ', uniqueUsedPortsIds);
    const usedPorts: Port[] = ports.filter(
      (port) => uniqueUsedPortsIds.indexOf(port._id.toString()) > -1
    );

    return {
      ports: JSON.parse(JSON.stringify(usedPorts)),
      message: null
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error while fetching ports: ', err);
    //logger.info(err);
    return { ports: [], destinations: [], message: 'Error while fetching ports' };
  }
};
