import { MonthDateRange } from '@/utils/date-time';

export interface ShipsParameters {
  destinationPortId?: string | null;
  departurePortId?: string | null;
  loadingDate?: MonthDateRange | null;
}
