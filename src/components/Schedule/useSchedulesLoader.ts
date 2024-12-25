import { ShipStop } from '@/models/ShipStop';
import { useEffect, useState } from 'react';
import { getSchedules, queryNearestShippings } from '@/controllers/SchedulesController';
import { MonthDateRange } from '@/utils/date-time';
import { Destination, Port } from '@/models/Port';
import { Types } from 'mongoose';
import { ScheduleSectionProps } from '@/components/Schedule/Schedule';
import { ShipsParameters } from '@/models/types';

export const emptyPortErrors = {
  departurePortId: '',
  destinationPortId: ''
};

export interface PortSchedulesState {
  ports: Port[];
  destinations: Destination[];
  destinationPortId: string | Types.ObjectId | null;
  destinationPorts: Port[];
  departurePortId: string | Types.ObjectId | null;
  loadingDate: MonthDateRange | null;
  isLoadingPort: boolean;
  isLoadingSchedule: boolean;
  destinationIndex: number | null;
  errors: any;
  schedules: ShipStop[][];
  errorMessage: string | null;
  isFirstRender: boolean;
}

export const defaultPortSchedulesState: PortSchedulesState = {
  ports: [],
  destinations: [],
  destinationPortId: null,
  destinationPorts: [],
  departurePortId: null,
  loadingDate: null,
  isLoadingPort: false,
  isLoadingSchedule: false,
  destinationIndex: null,
  errors: emptyPortErrors,
  schedules: [],
  errorMessage: null,
  isFirstRender: true
};
export interface ScheduleParameters {
  departurePortId?: string | null;
  destinationPortId?: string | null;
  loadingDate?: MonthDateRange | null;
}

export const useSchedulesLoader = ({ ports, schedules }: ScheduleSectionProps) => {
  const [schedulesState, setSchedulesState] = useState<PortSchedulesState>({
    ...defaultPortSchedulesState,
    ports: ports,
    schedules: schedules
  });

  const handleDeparturePortSelected = (departurePortId: string) => {
    // eslint-disable-next-line no-console
    console.log('handleDeparturePortSelected().  departurePortId: ', departurePortId);
    setSchedulesState((schedulesState) => ({
      ...schedulesState,
      departurePortId: departurePortId
    }));
  };
  const handleDestinationPortSelected = (destinationPortId: string) => {
    // eslint-disable-next-line no-console
    console.log('handleDestinationPortSelected().  destinationPortId: ', destinationPortId);
    setSchedulesState((schedulesState) => ({
      ...schedulesState,
      destinationPortId: destinationPortId
    }));
  };
  const handleLoadingDateSelected = (loadingDate: MonthDateRange | null) => {
    // eslint-disable-next-line no-console
    console.log('handleLoadingDateSelected().  loadingDate: ', loadingDate);
    setSchedulesState((schedulesState) => ({ ...schedulesState, loadingDate: loadingDate }));
  };

  useEffect(
    () => {
      // eslint-disable-next-line no-console
      console.log('Departure/destination port or loading date changed.  Reloading schedules.');
      const loadSchedules = async () => {
        /*if (schedulesState.isFirstRender) {
          setSchedulesState((schedulesState) => ({ ...schedulesState, isFirstRender: false }));
          return;
        }*/
        // eslint-disable-next-line no-console
        console.log('loadSchedules().  departurePortId: ');
        setSchedulesState((schedulesState) => ({ ...schedulesState, isLoadingSchedule: true }));
        if (schedulesState.departurePortId && schedulesState.destinationPortId) {
          const shipsParameters: ShipsParameters = {
            departurePortId: schedulesState.departurePortId as string,
            destinationPortId: schedulesState.destinationPortId as string,
            loadingDate: schedulesState.loadingDate
          };
          const schedules = await getSchedules(shipsParameters);
          // eslint-disable-next-line no-console
          //console.log('schedules: ', schedules);
          return setSchedulesState((schedulesState) => ({
            ...schedulesState,
            schedules: schedules
            //isLoadingSchedule: false
          }));
        }

        const nearestShippings = await queryNearestShippings(new Date());
        // eslint-disable-next-line no-console
        console.log('nearestShippings: ', nearestShippings);
        return setSchedulesState((schedulesState) => ({
          ...schedulesState,
          schedules: nearestShippings
          //isLoadingSchedule: false
        }));
      };
      loadSchedules();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      schedulesState.departurePortId,
      schedulesState.destinationPortId,
      schedulesState.loadingDate?.endDate,
      schedulesState.loadingDate?.startDate
    ]
  );

  return {
    schedulesState,
    handleDeparturePortSelected,
    handleDestinationPortSelected,
    handleLoadingDateSelected
  };
};
