import { MonthDateRange } from '@/utils/date-time';

export interface ShipsParameters {
  destinationPortId?: string | null;
  departurePortId?: string | null;
  loadingDate?: MonthDateRange | null;
}

export interface ShipsParametersFlat {
  departurePortId?: string | null;
  destinationPortId?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
}
