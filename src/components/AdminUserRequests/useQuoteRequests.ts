import { getQuoteRequestsAction } from '@/app/serverActions';
import { useState } from 'react';
import { ActionTableData, emptyTableData, TableData } from '@/utils/types';
import { QuoteRequestFrontend } from '@/models/QuoteRequestFrontend';
import { Messages } from '@/helpers/messages';
import { showNotification } from '@/modules/notifications/notificatios';
import { DataFetcherArgs } from '@/components/Table/types';
import {
  getFiltersQueryParameters,
  mapReactTableSortToApiSort,
  removeDateOffsetFromFilters
} from '@/components/Table/tableUtils';

export interface QuoteRequestsState {
  data: TableData<QuoteRequestFrontend>;
  isLoading: boolean;
  error: string | null;
}

export const defaultQuoteRequestState: QuoteRequestsState = {
  data: emptyTableData,
  isLoading: false,
  error: null
};

export const useQuoteRequests = () => {
  const [quoteRequestsState, setQuoteRequestsState] =
    useState<QuoteRequestsState>(defaultQuoteRequestState);

  const getQuoteRequests = async (dataFetcherArgs: DataFetcherArgs): Promise<void> => {
    setQuoteRequestsState((state) => ({ ...state, isLoading: true }));

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
      const result: ActionTableData<QuoteRequestFrontend> =
        await getQuoteRequestsAction(backendFetchParams);
      if (!result.success) {
        showNotification(false, result?.message || Messages.QuoteRequestFailed, true);
      }

      setQuoteRequestsState({
        data: result.data,
        isLoading: false,
        error: result.success ? null : result?.message || null
      });
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('getQuoteRequests() failed. Error: ', error);
      showNotification(false, error?.message || Messages.QuoteRequestFailed, true);

      setQuoteRequestsState({
        data: emptyTableData,
        isLoading: false,
        error: error?.message || Messages.QuoteRequestFailed
      });
    }
  };

  return { quoteRequestsState, getQuoteRequests };
};
