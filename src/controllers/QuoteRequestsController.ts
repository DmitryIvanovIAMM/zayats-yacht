'use server';

import { QuoteRequestModel } from '@/models/QuoteRequest';
import { BackendDataFetchArgs } from '@/components/Table/types';
import {
  FiltersFromQuery,
  getFiltersQuery,
  getSortingQuery
} from '@/controllers/mongoDbQueryHelpers';

export const getFilteredQuoteRequests = async (fetchParams: BackendDataFetchArgs) => {
  const { fromName, fromEmail, receivedAt } = fetchParams?.filters ? fetchParams.filters : {};
  const { page, perPage } = fetchParams;

  const filters = getFiltersQuery(
    {
      fromName: fromName,
      fromEmail: fromEmail,
      receivedAt: receivedAt
    } as FiltersFromQuery,
    'i'
  );
  const sortingQuery = getSortingQuery(fetchParams.sortBy as string | string[], 'receivedAt.desc');

  const query = { ...filters };

  const totalPromise = QuoteRequestModel.countDocuments(query);
  const quoteRequestsPromise = QuoteRequestModel.find(query)
    .collation({ locale: 'en' })
    .sort(sortingQuery)
    .skip(perPage * page)
    .limit(perPage);

  const [quoteRequests, total] = await Promise.all([quoteRequestsPromise, totalPromise]);

  const quoteRequestsFrontend = quoteRequests.map((quoteRequest) => ({
    _id: quoteRequest._id.toString(),
    fromUserId: quoteRequest?.fromUserId?.toString() || '[n/a]',
    fromName: quoteRequest?.fromName || '[n/a]',
    fromEmail: quoteRequest.fromEmail,
    receivedAt: quoteRequest.receivedAt,
    requestData: quoteRequest.requestData,
    requestObject: quoteRequest?.requestObject || {}
  }));

  return {
    data: quoteRequestsFrontend,
    total: total
  };
};
