import { ActionTableData, emptyTableData, TableData } from '@/utils/types';
import { PortFrontend } from '@/models/PortFrontend';
import { useState } from 'react';
import { DataFetcherArgs } from '@/components/Table/types';
import {
  getFiltersQueryParameters,
  mapReactTableSortToApiSort,
  removeDateOffsetFromFilters
} from '@/components/Table/tableUtils';
import { showNotification } from '@/modules/notifications/notificatios';
import { Messages } from '@/helpers/messages';
import { getPortsAction } from '@/app/serverActions';

export interface PortState {
  data: TableData<PortFrontend>;
  isLoading: boolean;
  error: string | null;
}
const defaultPortState: PortState = {
  data: emptyTableData,
  isLoading: false,
  error: null
};

export const usePorts = () => {
  const [portsState, setPortsState] = useState<PortState>(defaultPortState);

  const getPorts = async (dataFetcherArgs: DataFetcherArgs): Promise<void> => {
    setPortsState((state) => ({ ...state, isLoading: true }));

    const { pagination, sorting, columnFilters } = dataFetcherArgs;
    const backendFetchParams = {
      page: pagination.pageIndex,
      perPage: pagination.pageSize,
      sortBy: mapReactTableSortToApiSort(sorting ?? []),
      filters: {
        ...getFiltersQueryParameters(removeDateOffsetFromFilters(columnFilters, ['receivedAt']))
      }
    };

    try {
      const result: ActionTableData<PortFrontend> = await getPortsAction(backendFetchParams);
      if (!result.success) {
        showNotification(false, result?.message || Messages.FailedGetPorts, true);
      }

      setPortsState({
        data: result.data,
        isLoading: false,
        error: result.success ? null : result?.message || null
      });
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('getPorts() failed. Error: ', error);
      showNotification(false, error?.message || Messages.FailedGetPorts, true);

      setPortsState({
        data: emptyTableData,
        isLoading: false,
        error: error?.message || null
      });
    }
  };

  return { portsState, getPorts };
};
