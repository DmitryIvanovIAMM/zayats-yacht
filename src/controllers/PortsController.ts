'use server';

import { scheduleService } from '@/services/ScheduleService';
import { portService } from '@/services/PortService';
import { Port, PortModel } from '@/models/Port';
import { ShipStop } from '@/models/ShipStop';
import { BackendDataFetchArgs } from '@/components/Table/types';
import {
  FiltersFromQuery,
  getFiltersQuery,
  getSortingQuery
} from '@/controllers/mongoDbQueryHelpers';

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

export const getFilteredPorts = async (fetchParams: BackendDataFetchArgs) => {
  console.log('getFilteredPorts().  fetchParams: ', fetchParams);
  const { fromName, fromEmail, receivedAt } = fetchParams?.filters ? fetchParams.filters : {};
  const { page, perPage } = fetchParams;

  const filters = getFiltersQuery(
    {
      fromName: fromName,
      fromEmail: fromEmail,
      receivedAt: receivedAt
    } as FiltersFromQuery,
    'i'
  );
  const sortingQuery = getSortingQuery(fetchParams.sortBy as string | string[], 'receivedAt.desc');

  const query = { ...filters };

  const totalPromise = PortModel.countDocuments(query);
  const portsPromise = PortModel.find(query)
    .collation({ locale: 'en' })
    .sort(sortingQuery)
    .skip(perPage * page)
    .limit(perPage);

  const [ports, total] = await Promise.all([portsPromise, totalPromise]);

  const portsFrontend = ports.map((port) => ({
    _id: port._id.toString(),
    portName: port.portName,
    destinationName: port.destinationName,
    imageFileName: port.imageFileName
  }));

  return {
    data: portsFrontend,
    total: total
  };
};
