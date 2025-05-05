import { getQuoteRequestsAction } from '@/app/serverActions';
import { useState } from 'react';
import { LongActionData } from '@/utils/types';
import { QuoteRequestFrontend } from '@/models/QuoteRequest';
import { Messages } from '@/helpers/messages';
import { showNotification } from '@/modules/notifications/notificatios';

export interface QuoteRequestsState {
  quoteRequests: QuoteRequestFrontend[];
  isLoading: boolean;
  error: string | null;
}

export const defaultQuoteRequestState: QuoteRequestsState = {
  quoteRequests: [],
  isLoading: false,
  error: null
};

export const useQuoteRequests = () => {
  const [quoteRequestsState, setQuoteRequestsState] =
    useState<QuoteRequestsState>(defaultQuoteRequestState);

  const getQuoteRequests = async () => {
    setQuoteRequestsState((state) => ({ ...state, isLoading: true }));

    try {
      const result: LongActionData<QuoteRequestFrontend[]> = await getQuoteRequestsAction();
      if (!result.success) {
        showNotification(false, result?.message || Messages.QuoteRequestFailed, true);
      }

      setQuoteRequestsState({
        quoteRequests: result?.data || [],
        isLoading: false,
        error: result.success ? null : result?.message || null
      });
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('getQuoteRequests() failed. Error: ', error);
      showNotification(false, error?.message || Messages.QuoteRequestFailed, true);

      setQuoteRequestsState({
        quoteRequests: [],
        isLoading: false,
        error: c
      });
    }
  };

  return [quoteRequestsState, getQuoteRequests];
};
