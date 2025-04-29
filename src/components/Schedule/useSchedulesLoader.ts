import { ShipStopWithSailingAndPort } from '@/models/ShipStop';
import { useEffect, useState } from 'react';
//import { getSchedules, queryNearestShippingsAction } from '@/controllers/SchedulesController';
import { MonthDateRange } from '@/utils/date-time';
import { Destination, PortFrontend } from '@/models/Port';
import { Types } from 'mongoose';
import { ScheduleSectionProps } from '@/components/Schedule/Schedule';
import { ShipsParameters } from '@/models/types';
import { getNearestSchedule } from '@/app/api/schedule/nearest/getNearestSchedule';
import { getSchedule } from '@/app/api/schedule/getSchedule';

export const emptyPortErrors = {
  departurePortId: '',
  destinationPortId: ''
};

export interface PortSchedulesState {
  ports: PortFrontend[];
  destinations: Destination[];
  destinationPortId: string | Types.ObjectId | null;
  destinationPorts: PortFrontend[];
  departurePortId: string | Types.ObjectId | null;
  loadingDate: MonthDateRange | null;
  isLoadingPort: boolean;
  isLoadingSchedule: boolean;
  destinationIndex: number | null;
  errors: any;
  schedules: ShipStopWithSailingAndPort[][];
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

  useEffect(
    () => {
      const loadSchedules = async () => {
        if (schedulesState.isFirstRender) {
          setSchedulesState((schedulesState) => ({ ...schedulesState, isFirstRender: false }));
          return;
        }
        setSchedulesState((schedulesState) => ({ ...schedulesState, isLoadingSchedule: true }));
        if (schedulesState.departurePortId && schedulesState.destinationPortId) {
          const shipsParameters: ShipsParameters = {
            departurePortId: schedulesState.departurePortId as string,
            destinationPortId: schedulesState.destinationPortId as string,
            loadingDate: schedulesState.loadingDate
          };
          const schedules = await getSchedule(shipsParameters);
          return setSchedulesState((schedulesState) => ({
            ...schedulesState,
            schedules: schedules,
            isLoadingSchedule: false
          }));
        }

        const schedules = await getNearestSchedule();
        return setSchedulesState((schedulesState) => ({
          ...schedulesState,
          schedules: schedules,
          isLoadingSchedule: false
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
