import { ShipStop, ShipStopModel } from '@/models/ShipStop';
import { Sailing, SailingModel, SailingWithShipStopAndPort } from '@/models/Sailing';
import { BackendDataFetchArgs } from '@/components/Table/types';
import {
  FiltersFromQuery,
  getFiltersQuery,
  getSortingQuery
} from '@/controllers/mongoDbQueryHelpers';
import { Types } from 'mongoose';

export default class ScheduleService {
  private static instance: ScheduleService;
  private constructor() {}
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ScheduleService();
    return this.instance;
  }

  public getActiveShipStops = (): Promise<ShipStop[]> => {
    return ShipStopModel.aggregate([
      {
        $lookup: {
          from: 'sailings',
          localField: 'sailingId',
          foreignField: '_id',
          as: 'sailing'
        }
      },
      {
        $unwind: {
          path: '$sailing',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          $and: [{ 'sailing.deletedAt': { $exists: false } }, { 'sailing.isActive': true }]
        }
      }
    ]);
  };

  public queryAllActiveShipStopsWithPortsAndSailings = async (): Promise<ShipStop[]> => {
    const shipStops = await ShipStopModel.aggregate([
      {
        $lookup: {
          from: 'ports',
          localField: 'portId',
          foreignField: '_id',
          as: 'departurePort'
        }
      },
      {
        $unwind: '$departurePort'
      },
      {
        $lookup: {
          from: 'sailings',
          localField: 'sailingId',
          foreignField: '_id',
          as: 'sailing'
        }
      },
      {
        $unwind: '$sailing'
      },
      {
        $match: {
          $and: [{ 'sailing.deletedAt': { $exists: false } }, { 'sailing.isActive': true }]
        }
      }
    ]);
    return shipStops;
  };

  public queryAllActiveShipStopsWithPortsAndSailingsFromDate = async (
    date: Date
  ): Promise<ShipStop[]> => {
    const shipStops = await ShipStopModel.aggregate([
      {
        $match: { arrivalOn: { $gte: date } }
      },
      {
        $lookup: {
          from: 'ports',
          localField: 'portId',
          foreignField: '_id',
          as: 'departurePort'
        }
      },
      {
        $unwind: '$departurePort'
      },
      {
        $lookup: {
          from: 'sailings',
          localField: 'sailingId',
          foreignField: '_id',
          as: 'sailing'
        }
      },
      {
        $unwind: '$sailing'
      },
      {
        $match: {
          $and: [{ 'sailing.deletedAt': { $exists: false } }, { 'sailing.isActive': true }]
        }
      }
    ]);

    return shipStops;
  };

  public querySailingsWithRoutesAndPorts = async (
    fetchParams: BackendDataFetchArgs
  ): Promise<{ data: SailingWithShipStopAndPort[]; total: number }> => {
    const { name } = fetchParams?.filters ? fetchParams.filters : {};
    const { page, perPage } = fetchParams;

    const filters = getFiltersQuery(
      {
        name: name
      } as FiltersFromQuery,
      'i'
    );
    const sortingQuery = getSortingQuery(
      fetchParams.sortBy as string | string[],
      'shipStops.0.arrivalOn.desc'
    );

    const baseQuery = {
      deletedAt: { $exists: false },
      ...filters
    };

    const totalPromise = SailingModel.countDocuments(baseQuery);

    const sailingsWithShipStopsAndPortsPromise = SailingModel.aggregate([
      {
        $match: {
          ...baseQuery
        }
      },
      {
        $lookup: {
          from: 'shipstops',
          localField: '_id',
          foreignField: 'sailingId',
          as: 'shipStops'
        }
      },
      {
        $set: {
          shipStops: {
            $sortArray: { input: '$shipStops', sortBy: { arrivalOn: 1 } }
          }
        }
      },
      {
        $unwind: '$shipStops'
      },
      {
        $lookup: {
          from: 'ports',
          localField: 'shipStops.portId',
          foreignField: '_id',
          as: 'shipStops.port'
        }
      },
      {
        $unwind: '$shipStops.port'
      },
      {
        $group: {
          _id: '$_id',
          root: {
            $mergeObjects: '$$ROOT'
          },
          shipStops: {
            $push: '$shipStops'
          }
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$root', '$$ROOT']
          }
        }
      },
      {
        $project: {
          root: 0
        }
      },
      { $sort: sortingQuery },
      {
        $skip: page * perPage
      },
      {
        $limit: perPage
      }
    ]);

    const [sailingsWithShipStopsAndPorts, total] = await Promise.all([
      sailingsWithShipStopsAndPortsPromise,
      totalPromise
    ]);

    return {
      data: sailingsWithShipStopsAndPorts,
      total: total
    };
  };

  setSailingActivityStatus(sailingId: string, isActive: boolean) {
    return SailingModel.findByIdAndUpdate(
      { _id: new Types.ObjectId(sailingId) },
      {
        $set: {
          isActive: isActive
        }
      },
      { new: true }
    );
  }

  softDeleteSailing(sailingId: string, userId: Types.ObjectId) {
    return SailingModel.findByIdAndUpdate(
      new Types.ObjectId(sailingId),
      {
        deletedAt: new Date(),
        deletedBy: userId // Replace with actual user ID
      },
      { new: true }
    );
  }

  createSailingByName(name: string) {
    const newSailing: Sailing = {
      _id: new Types.ObjectId(),
      name: name,
      isActive: true,
      createdAt: new Date()
    };
    console.log('to be Sailing: ', newSailing);
    return SailingModel.create(newSailing);
  }

  createShipStops(shipStops: ShipStop[]): Promise<ShipStop[]> {
    return ShipStopModel.create(shipStops);
  }

  updateSailingName(sailingId: string, name: string) {
    return SailingModel.findByIdAndUpdate(
      new Types.ObjectId(sailingId),
      {
        name: name
      },
      { new: true }
    );
  }

  deleteShipStopsBySailingId(sailingId: string) {
    return ShipStopModel.deleteMany({ sailingId: new Types.ObjectId(sailingId) });
  }

  /*public querySailingWithShipStops = async (sailingId: string) => {
    const sailingsWithShipStopsAndPorts = await SailingModel.aggregate([
      {
        $match: {
          $and: [{ _id: { $eq: new Types.ObjectId(sailingId) } }, { deletedAt: { $exists: false } }]
        }
      },
      {
        $lookup: {
          from: 'shipstops',
          localField: '_id',
          foreignField: 'sailingId',
          as: 'shipStops'
        }
      }
    ]);

    if (sailingsWithShipStopsAndPorts && sailingsWithShipStopsAndPorts.length > 0) {
      const sailing = sailingsWithShipStopsAndPorts[0];
      sailing.shipStops = [...sortShipStopsByDate(sailing.shipStops)];
      return sailing;
    } else {
      return [];
    }
  };

  createShipStops(shipStops: ShipStop): Promise<ShipStop> {
    return ShipStopModel.create(shipStops, { new: true });
  }

  softDeleteSailing(sailingId: string): Promise<ShipStop> {
    return SailingModel.findByIdAndUpdate(
      new Types.ObjectId(sailingId),
      {
        deletedAt: nowUTC()
      },
      { new: true }
    );
  }*/
}

export const scheduleService = ScheduleService.getInstance();
