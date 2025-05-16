import { QuoteRequest, QuoteRequestModel } from '@/models/QuoteRequest';
import { BackendDataFetchArgs } from '@/components/Table/types';
import {
  FiltersFromQuery,
  getFiltersQuery,
  getSortingQuery
} from '@/controllers/mongoDbQueryHelpers';

export default class QuoteRequestsService {
  private static instance: QuoteRequestsService;
  private constructor() {}
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new QuoteRequestsService();
    return this.instance;
  }

  public create = async (quoteRequest: QuoteRequest): Promise<QuoteRequest> => {
    try {
      return await QuoteRequestModel.create(quoteRequest);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error creating quota request:', error);
      throw error;
    }
  };

  public getFilteredQuoteRequests = async (fetchParams: BackendDataFetchArgs) => {
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
    const sortingQuery = getSortingQuery(
      fetchParams.sortBy as string | string[],
      'receivedAt.desc'
    );

    const query = { ...filters };

    const totalPromise = QuoteRequestModel.countDocuments(query);
    const quoteRequestsPromise = QuoteRequestModel.find(query)
      .collation({ locale: 'en' })
      .sort(sortingQuery)
      .skip(perPage * page)
      .limit(perPage);

    const [quoteRequests, total] = await Promise.all([quoteRequestsPromise, totalPromise]);

    return {
      data: quoteRequests,
      total: total
    };
  };
}

export const quoteRequestService = QuoteRequestsService.getInstance();
