import { ShipStop } from '@/models/ShipStop';
import { useCallback, useState } from 'react';
import { queryNearestShippings } from '@/controllers/SchedulesController';
import { MonthDateRange } from '@/utils/date-time';
import { Destination, Port } from '@/models/Port';
import { Types } from 'mongoose';
import { ScheduleSectionProps } from '@/components/Schedule/Schedule';

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
  errorMessage: null
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
    setSchedulesState((schedulesState) => ({
      ...schedulesState,
      departurePortId: departurePortId
    }));
  };
  const handleDestinationPortSelected = (destinationPortId: string) => {
    setSchedulesState((schedulesState) => ({
      ...schedulesState,
      destinationPortId: destinationPortId
    }));
  };
  const handleLoadingDateSelected = (loadingDate: MonthDateRange | null) => {
    setSchedulesState((schedulesState) => ({ ...schedulesState, loadingDate: loadingDate }));
  };

  const loadSchedules = useCallback(
    async ({ departurePortId, destinationPortId, loadingDate }: ScheduleParameters) => {
      // eslint-disable-next-line no-console
      console.log(
        'loadSchedules().  departurePortId: ',
        departurePortId,
        'destinationPortId: ',
        destinationPortId,
        'loadingDate: ',
        loadingDate
      );
      setSchedulesState((schedulesState) => ({ ...schedulesState, isLoading: true }));
      if (!departurePortId || !destinationPortId || !loadingDate) {
        const nearestShippings = await queryNearestShippings(new Date());
        setSchedulesState((schedulesState) => ({
          ...schedulesState,
          schedules: nearestShippings,
          isLoading: false
        }));
      }
    },
    [schedulesState.departurePortId, schedulesState.destinationPortId, schedulesState.loadingDate]
  );

  return {
    schedulesState,
    handleDeparturePortSelected,
    handleDestinationPortSelected,
    handleLoadingDateSelected,
    loadSchedules
  };
};
