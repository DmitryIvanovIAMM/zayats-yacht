import { Aggregate, Types } from 'mongoose';
import { ShipStop, ShipStopModel } from '../models/ShipStop';
import { SailingModel } from '../models/Sailing';
import { nowUTC } from '../utils/date-time';
import { sortShipStopsByDate } from '../utils/schedules';

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

  /*public queryAllActiveShipStopsWithPortsAndSailings = async () => {
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
  };*/

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

  /*public querySailingsWithRoutesAndPorts = async () => {
    const sailingsWithShipStopsAndPorts = await SailingModel.aggregate([
      {
        $match: { deletedAt: { $exists: false } }
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
      }
    ]);
    sailingsWithShipStopsAndPorts.forEach((sailing) => {
      sailing.shipStops = [...sortShipStopsByDate(sailing.shipStops)];
    });
    return sailingsWithShipStopsAndPorts.sort(function (a, b) {
      return (
        new Date(a.shipStops[0].departureOn).getTime() -
        new Date(b.shipStops[0].departureOn).getTime()
      );
    });
  };

  createSailingByName(name: string) {
    const newSailing = {
      name: name
    };
    return SailingModel.create(newSailing);
  }

  updateSailingName(sailingId: string, name: string) {
    return SailingModel.findByIdAndUpdate(
      sailingId,
      {
        name: name
      },
      { new: true }
    );
  }

  deleteShipStopsBySailingId(sailingId: string) {
    return ShipStopModel.deleteMany({ sailingId: new Types.ObjectId(sailingId) });
  }

  setSailingActivityStatus(sailingId: string, isActive: boolean) {
    return SailingModel.findByIdAndUpdate(
      { _id: sailingId },
      {
        $set: {
          isActive: isActive
        }
      },
      { new: true }
    );
  }

  public querySailingWithShipStops = async (sailingId: string) => {
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
