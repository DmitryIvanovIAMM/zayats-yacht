import { scheduleService } from '@/services/ScheduleService';
import { portService } from '@/services/PortService';
import { Port } from '@/models/Port';
import { ShipStop } from '@/models/ShipStop';
import { getDestinationsFormPorts } from '@/utils/portUtils';
import logger from '../../logger';

export default class PortsController {
  private static instance: PortsController;
  private constructor() {}
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new PortsController();
    return this.instance;
  }

  public getPorts = async () => {
    try {
      const ports: Port[] = await portService.getAllPorts();
      const shipStops: ShipStop[] = await scheduleService.getActiveShipStops();
      const usedPortsId: string[] = shipStops.map((shipStop) => shipStop.portId.toString());
      const uniqueUsedPortsIds = Array.from(new Set(usedPortsId));
      const usedPorts: Port[] = ports.filter(
        (port) => uniqueUsedPortsIds.indexOf(port._id.toString()) > -1
      );
      const destinations = getDestinationsFormPorts(usedPorts);

      return { ports: usedPorts, destinations, message: null };
    } catch (err) {
      logger.info(err);
      return { ports: [], destinations: [], message: 'Error while fetching ports' };
    }
  };
}

export const portsController = PortsController.getInstance();
