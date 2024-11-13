import * as schedulesUtils from '../schedules';

export const searchRoutes = (ships, shipStops, departurePortId, destinationPortId) => {
  const schedules = ships.map(function (ship) {
    const shipStopsForShip = shipStops
      .filter((shipStop) => shipStop.shipId.toString() === ship._id.toString())
      .sort(schedulesUtils.comparatorByArrivalOnDateString);
    return searchRoutesForShip(shipStopsForShip, departurePortId, destinationPortId);
  });
  return flat(schedules);
};

export const searchRoutesForShip = (shipStops, departurePortId, destinationPortId) => {
  const schedules = [];
  shipStops.forEach(function (item, i) {
    if (item.portId.toString() === departurePortId) {
      const restOfShipStops = shipStops.slice(i); // If end is omitted, slice extracts to the end of the sequence.
      const possibleNewSchedule = searchScheduleFromCurrentToDestinationPort(
        restOfShipStops.filter(shipStop => shipStop.sailingId.toString() === item.sailingId.toString()),
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
  shipStops,
  departurePortId,
  destinationPortId
) => {
  for (let i = 1; i < shipStops.length; i++) {
    if (shipStops[i].portId.toString() === departurePortId) return null;
    if (shipStops[i].portId.toString() === destinationPortId && shipStops[i]) {
      return shipStops.slice(0, i + 1);
    }
  }
  return null;
};

export const filteredByLoadingDate = (schedules, loadingDates) => {
  const startOfInterval = new Date(loadingDates.startDate).setHours(0, 0, 0, 0);
  const endOfInterval = new Date(loadingDates.endDate).setHours(23, 59, 59, 999);
  return schedules.filter((schedule) => {
    return schedule[0].arrivalOn >= startOfInterval && schedule[0].arrivalOn <= endOfInterval;
  });
};

const flat = (input, depth = 1, stack = []) => {
  for (const item of input) {
    if (item instanceof Array && depth > 0) {
      flat(item, depth - 1, stack);
    } else {
      stack.push(item);
    }
  }

  return stack;
};
