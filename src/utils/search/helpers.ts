import * as schedulesUtils from '../schedules';
import { Ship } from '@/models/Ship';
import { ShipStop } from '@/models/ShipStop';

export const searchRoutes = (
  ships: Ship[],
  shipStops: ShipStop[],
  departurePortId: string,
  destinationPortId: string
): ShipStop[][] => {
  const schedules = ships.map(function (ship) {
    const shipStopsForShip = shipStops
      .filter((shipStop) => shipStop.shipId.toString() === ship._id.toString())
      .sort(schedulesUtils.comparatorByArrivalOnDateString);
    return searchRoutesForShip(shipStopsForShip, departurePortId, destinationPortId);
  });
  return flat(schedules);
};

export const searchRoutesForShip = (
  shipStops: ShipStop[],
  departurePortId: string,
  destinationPortId: string
): ShipStop[][] => {
  const schedules: ShipStop[][] = [];
  shipStops.forEach(function (item, i) {
    if (item.portId.toString() === departurePortId) {
      const restOfShipStops = shipStops.slice(i); // If end is omitted, slice extracts to the end of the sequence.
      const possibleNewSchedule = searchScheduleFromCurrentToDestinationPort(
        restOfShipStops.filter(
          (shipStop) => shipStop.sailingId.toString() === item.sailingId.toString()
        ),
        departurePortId,
        destinationPortId
      );
      if (possibleNewSchedule && possibleNewSchedule.length > 0) {
        schedules.push(possibleNewSchedule);
      }
    }
  });
  return schedules;
};

const searchScheduleFromCurrentToDestinationPort = (
  shipStops: ShipStop[],
  departurePortId: string,
  destinationPortId: string
): ShipStop[] => {
  for (let i = 1; i < shipStops.length; i++) {
    if (shipStops[i].portId.toString() === departurePortId) return [];
    if (shipStops[i].portId.toString() === destinationPortId && shipStops[i]) {
      return shipStops.slice(0, i + 1);
    }
  }
  return [];
};

export interface LoadingDates {
  startDate: Date | string;
  endDate: Date | string;
}

export const filteredByLoadingDate = (
  schedules: ShipStop[][],
  loadingDates: LoadingDates
): ShipStop[][] => {
  const startOfInterval = new Date(new Date(loadingDates.startDate).setHours(0, 0, 0, 0));
  const endOfInterval = new Date(new Date(loadingDates.endDate).setHours(23, 59, 59, 999));
  return schedules.filter((schedule: ShipStop[]) => {
    return schedule[0].arrivalOn >= startOfInterval && schedule[0].arrivalOn <= endOfInterval;
  });
};

// ToDo Mey be ney array.fla() can be used - ?
const flat = (input: any, depth = 1, stack: any = []): any => {
  for (const item of input) {
    if (item instanceof Array && depth > 0) {
      flat(item, depth - 1, stack);
    } else {
      stack.push(item);
    }
  }

  return stack;
};
