import { Port, PortModel } from '@/models/Port';
import { BackendDataFetchArgs } from '@/components/Table/types';
import {
  FiltersFromQuery,
  getFiltersQuery,
  getSortingQuery
} from '@/controllers/mongoDbQueryHelpers';
import { Types } from 'mongoose';
import { User } from '@/models/User';

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

    const query = {
      deletedAt: { $exists: false },
      ...filters
    };

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

  public getActivePorts = async (): Promise<Port[]> => {
    try {
      return PortModel.find({ deletedAt: { $exists: false } }).lean<Port[]>();
    } catch {
      return [];
    }
  };

  public getPortFromDB = async (portId: string): Promise<Port | null> => {
    const port = await PortModel.findById(new Types.ObjectId(portId));
    if (!port) {
      return null;
    }
    return port;
  };

  public addPortInDB = async (port: Port) => {
    return PortModel.create(port);
  };

  public updatePortInDB = async (_id: string, port: Partial<Port>) => {
    return PortModel.findByIdAndUpdate(new Types.ObjectId(_id), port, { new: true });
  };

  public softDeletePortFromDB = async (portId: string, user: User) => {
    return PortModel.findByIdAndUpdate(
      new Types.ObjectId(portId),
      {
        deletedAt: new Date(),
        deletedBy: user._id
      },
      { new: true }
    );
  };
}

export const portService = PortService.getInstance();
