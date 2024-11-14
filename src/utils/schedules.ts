import { ShipStop } from '@/models/ShipStop';

export const sortRoutesByDates = (routes: ShipStop[][]) => {
  const schedulesWithSortedRoutes = routes.map((route) =>
    [...route].sort(comparatorByDepartureOnDateString)
  );
  return [...schedulesWithSortedRoutes].sort(comparatorByFirstDepartureOnDateString);
};

export const comparatorByDepartureOnDateString = (route1: ShipStop, route2: ShipStop) => {
  if (new Date(route1.departureOn) < new Date(route2.departureOn)) return -1;
  return 0;
};

export const comparatorByArrivalOnDateString = (route1: ShipStop, route2: ShipStop) => {
  return compareDate(route1.arrivalOn, route2.arrivalOn);
  //return new Date(route1.arrivalOn) - new Date(route2.arrivalOn);
};

export const comparatorByFirstDepartureOnDateString = (route1: ShipStop[]) => {
  return compareDate(route1[0].departureOn, route1[0].departureOn);
  //return new Date(route1[0].departureOn) - new Date(c);
};

export const isDate = (date: Date | string): boolean => {
  const d = new Date(date);
  //return new Date(date) !== 'Invalid Date' && !isNaN(new Date(date));
  return d instanceof Date && !isNaN(d.getTime());
};

export const compareDate = (date1: Date, date2: Date): number => {
  // With Date object we can compare dates them using the >, <, <= or >=.
  // The ==, !=, ===, and !== operators require to use date.getTime(),
  // so we need to create a new instance of Date with 'new Date()'
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Check if the dates are equal
  const same = d1.getTime() === d2.getTime();
  if (same) return 0;

  // Check if the first is greater than second
  if (d1 > d2) return 1;

  // Check if the first is less than second
  if (d1 < d2) return -1;
  return 0;
};

export const sortShipStopsByDate = (shipStops: ShipStop[]) => {
  return shipStops.sort(function (a, b) {
    return new Date(a.departureOn).getTime() - new Date(b.departureOn).getTime();
  });
};
