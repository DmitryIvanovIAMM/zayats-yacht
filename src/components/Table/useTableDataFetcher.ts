import { ActionTableData, emptyTableData, TableData } from '@/utils/types';
import { useState } from 'react';
import { BackendDataFetchArgs, DataFetcherArgs } from '@/components/Table/types';
import {
  getFiltersQueryParameters,
  mapReactTableSortToApiSort,
  removeDateOffsetFromFilters
} from '@/components/Table/tableUtils';
import { showNotification } from '@/modules/notifications/notifications';
import { Messages } from '@/helpers/messages';
import { getBackendDataByAdminAction } from '@/app/server-actions/serverActions';

export interface DataState<D> {
  data: TableData<D>;
  isLoading: boolean;
  error: string | null;
}
const defaultDataState = {
  data: emptyTableData,
  isLoading: false,
  error: null
};

export const useTableDataFetcher = <T>(
  getterFunction: (fetchParams: BackendDataFetchArgs) => Promise<TableData<T>>,
  dateColumns: string[] = [],
  errorMessage: string = Messages.FailedGetData
) => {
  const [dataState, setDataState] = useState<DataState<T>>(defaultDataState);

  const fetchDataFromServer = async (dataFetcherArgs: DataFetcherArgs): Promise<void> => {
    setDataState((state) => ({ ...state, isLoading: true }));

    const { pagination, sorting, columnFilters } = dataFetcherArgs;
    const backendFetchParams = {
      page: pagination.pageIndex,
      perPage: pagination.pageSize,
      sortBy: mapReactTableSortToApiSort(sorting ?? []),
      filters: {
        ...getFiltersQueryParameters(removeDateOffsetFromFilters(columnFilters, dateColumns))
      }
    };

    try {
      const result: ActionTableData<T> = await getBackendDataByAdminAction<T>(
        backendFetchParams,
        getterFunction,
        errorMessage
      );
      if (!result.success) {
        showNotification(false, result?.message || Messages.FailedGetData, true);
      }

      setDataState({
        data: result.data,
        isLoading: false,
        error: result.success ? null : result?.message || null
      });
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('useTableDataFetcher() failed. Error: ', error);
      showNotification(false, error?.message || errorMessage, true);

      setDataState({
        data: emptyTableData,
        isLoading: false,
        error: error?.message || errorMessage
      });
    }
  };

  return { dataState, setDataState, fetchDataFromServer };
};
