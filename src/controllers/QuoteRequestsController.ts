'use server';

import { BackendDataFetchArgs } from '@/components/Table/types';
import { mapQuoteRequestsToFrontend } from '@/models/mappers.';
import { quoteRequestService } from '@/services/QuoteRequestsService';

export const getFilteredQuoteRequests = async (fetchParams: BackendDataFetchArgs) => {
  const { data, total } = await quoteRequestService.getFilteredQuoteRequests(fetchParams);

  return {
    data: mapQuoteRequestsToFrontend(data),
    total: total
  };
};
