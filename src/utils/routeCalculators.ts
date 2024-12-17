import { ShipStop } from '@/models/ShipStop';

export const calculateMilesForRoute = (routes: ShipStop[]) => {
  return routes.reduce((acc: number, item) => acc + item.miles, 0);
};

export const calculateDaysInTransit = (routes: ShipStop[]) => {
  const arrivalStartPortDate = new Date(routes[0].arrivalOn);
  const arrivalEndPortDate = new Date(routes[routes.length - 1].arrivalOn);

  return daysBetween(arrivalStartPortDate, arrivalEndPortDate);
};

export const daysBetween = (date1: Date, date2: Date) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds in one day
  return Math.round(Math.abs((date1.setHours(0, 0, 0) - date2.setHours(0, 0, 0)) / oneDay));
};

export const NO_MATCHING_SCHEDULES_MESSAGE = 'No matching schedules.';
export const SELECT_DESTINATION_PORT_MESSAGE = 'Select destination port.';
export const SELECT_LOADING_PORT_MESSAGE = 'Select loading port.';
export const SELECT_DESTINATION_LOADING_PORTS_MESSAGE = 'Select destination and loading ports.';

export const getNoRoutesMessage = (
  routesListLength: number,
  isLoadingPortSelected: boolean,
  isDestinationPortSelected: boolean
) => {
  if (routesListLength === 0) {
    if (isLoadingPortSelected && isDestinationPortSelected) {
      return NO_MATCHING_SCHEDULES_MESSAGE;
    } else {
      if (isLoadingPortSelected) {
        return SELECT_DESTINATION_PORT_MESSAGE;
      }
      if (isDestinationPortSelected) {
        return SELECT_LOADING_PORT_MESSAGE;
      }
      return SELECT_DESTINATION_LOADING_PORTS_MESSAGE;
    }
  } else {
    return '';
  }
};
