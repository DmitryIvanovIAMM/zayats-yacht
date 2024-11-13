import { Types } from 'mongoose';
import ShipStop from '../models/ShipStop';
import Sailing from '../models/Sailing';
import { nowUTC } from '@efacity/common';
import { sortShipStopsByDate } from '../utils/schedules';

export default class ScheduleService {

  public getActiveShipStops = () => {
    return ShipStop.aggregate([
      {
        '$lookup': {
          'from': 'sailings',
          'localField': 'sailingId',
          'foreignField': '_id',
          'as': 'sailing'
        }
      }, {
        '$unwind': {
          'path': '$sailing',
          'preserveNullAndEmptyArrays': true
        }
      },
      {
        $match: {
          $and: [
            { 'sailing.deletedAt': { $exists: false } },
            { 'sailing.isActive': true}
          ]
        }
      }
    ]);
  }

  public queryAllActiveShipStopsWithPortsAndSailings = async () => {
    const shipStops = await ShipStop.aggregate([
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
          $and: [
            { 'sailing.deletedAt': { $exists: false } },
            { 'sailing.isActive': true}
          ]
        }
      }
    ]);
    return shipStops;
  };

  public queryAllActiveShipStopsWithPortsAndSailingsFromDate = async (date: Date) => {
    const shipStops = await ShipStop.aggregate([
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
          $and: [
            { 'sailing.deletedAt': { $exists: false } },
            { 'sailing.isActive': true}
          ]
        }
      }
    ]);

    return shipStops;
  };

  public querySailingsWithRoutesAndPorts = async () => {
    const sailingsWithShipStopsAndPorts = await Sailing.aggregate([
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
    return Sailing.create(newSailing);
  }

  updateSailingName(sailingId: string, name: string) {
    return  Sailing.findByIdAndUpdate(
      sailingId,
      {
        name: name
      },
      { new: true }
    );

  }

  deleteShipStopsBySailingId(sailingId: string) {
    return  ShipStop.deleteMany(
      {sailingId: Types.ObjectId(sailingId)}
    );
  }

  setSailingActivityStatus(sailingId: string, isActive: boolean) {
    return Sailing.findByIdAndUpdate(
      { _id: sailingId },
      {
        $set: {
          isActive: isActive,
        }
      },
      { new: true })
  }

  public querySailingWithShipStops = async (sailingId: string) => {
    const sailingsWithShipStopsAndPorts = await Sailing.aggregate([
      {
        $match: {
          $and: [
            { _id: { $eq: Types.ObjectId(sailingId) } },
            { deletedAt: { $exists: false } }
          ]
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

    if( sailingsWithShipStopsAndPorts && sailingsWithShipStopsAndPorts.length > 0) {
      const sailing = sailingsWithShipStopsAndPorts[0];
      sailing.shipStops = [...sortShipStopsByDate(sailing.shipStops)]
      return sailing;
    } else {
      return [];
    }
  };

  createShipStops(shipStops) {
    return ShipStop.create(shipStops);
  }

  softDeleteSailing(sailingId: string) {
    return Sailing.findByIdAndUpdate(
      Types.ObjectId(sailingId),
      {
        deletedAt: nowUTC()
      },
      { new: true }
    );
  }
}
