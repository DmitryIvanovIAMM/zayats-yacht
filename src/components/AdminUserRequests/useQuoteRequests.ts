import { getQuoteRequestsAction } from '@/app/serverActions';
import { useState } from 'react';
import { ActionTableData } from '@/utils/types';
import { QuoteRequestFrontend } from '@/models/QuoteRequestFrontend';
import { Messages } from '@/helpers/messages';
import { showNotification } from '@/modules/notifications/notificatios';

export interface QuoteRequestsState {
  data: {
    data: QuoteRequestFrontend[];
    total: number;
  };
  isLoading: boolean;
  error: string | null;
}

export const defaultQuoteRequestState: QuoteRequestsState = {
  data: {
    data: [],
    total: 0
  },
  isLoading: false,
  error: null
};

export const useQuoteRequests = () => {
  const [quoteRequestsState, setQuoteRequestsState] =
    useState<QuoteRequestsState>(defaultQuoteRequestState);

  const getQuoteRequests = async (): Promise<void> => {
    setQuoteRequestsState((state) => ({ ...state, isLoading: true }));

    try {
      const result: ActionTableData<QuoteRequestFrontend> = await getQuoteRequestsAction();
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
        data: {
          data: [],
          total: 0
        },
        isLoading: false,
        error: error?.message || Messages.QuoteRequestFailed
      });
    }
  };

  return { quoteRequestsState, getQuoteRequests };
};
