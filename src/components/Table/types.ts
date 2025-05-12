import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import { MutableRefObject } from 'react';
import { Fetcher, SWRResponse } from 'swr';

export interface DataFetcherArgs {
  url: string;
  pagination: PaginationState;
  columnFilters: ColumnFiltersState;
  sorting?: SortingState;
}

export interface BackendDataFetchArgs {
  page: number;
  perPage: number;
  sortBy?: string[];
  filters?: Record<string, string>;
}

export const initialDataFetcherArgs: DataFetcherArgs = {
  url: '',
  pagination: { pageIndex: 0, pageSize: 50 },
  columnFilters: [],
  sorting: []
};

export interface DataFetcherData<TableData extends { _id: string }> {
  data: TableData[];
  total: number;
}

export type DataFetcher<TableData extends { _id: string }> = Fetcher<
  DataFetcherData<TableData>,
  DataFetcherArgs
>;

export type TableRef<TableData extends { _id: string }> = {
  refetchTableData: SWRResponse<{
    data: TableData[];
    total: number;
  }>['mutate'];
  dataFetcherArgs: DataFetcherArgs;
} | null;

export interface MutableTableRefObject<TableData extends { _id: string }> {
  tableRef?: MutableRefObject<TableRef<TableData>>;
}
