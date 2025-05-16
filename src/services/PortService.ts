import { Port, PortModel } from '@/models/Port';
import { BackendDataFetchArgs } from '@/components/Table/types';
import {
  FiltersFromQuery,
  getFiltersQuery,
  getSortingQuery
} from '@/controllers/mongoDbQueryHelpers';

export default class PortService {
  private static instance: PortService;
  private constructor() {}
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new PortService();
    return this.instance;
  }

  public getAllPorts = async (): Promise<Port[]> => {
    try {
      return PortModel.find({}).lean<Port[]>();
    } catch {
      return [];
    }
  };

  public getFilteredPorts = async (fetchParams: BackendDataFetchArgs) => {
    const { portName, destinationName } = fetchParams?.filters ? fetchParams.filters : {};
    const { page, perPage } = fetchParams;

    const filters = getFiltersQuery(
      {
        portName: portName,
        destinationName: destinationName
      } as FiltersFromQuery,
      'i'
    );
    const sortingQuery = getSortingQuery(fetchParams.sortBy as string | string[], 'portName.asc');

    const query = { ...filters };

    const totalPromise = PortModel.countDocuments(query);
    const portsPromise = PortModel.find(query)
      .collation({ locale: 'en' })
      .sort(sortingQuery)
      .skip(perPage * page)
      .limit(perPage);

    const [ports, total] = await Promise.all([portsPromise, totalPromise]);

    return {
      data: ports,
      total: total
    };
  };
}

export const portService = PortService.getInstance();
