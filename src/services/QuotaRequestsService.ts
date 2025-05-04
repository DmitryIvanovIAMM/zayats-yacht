import { QuoteRequest, QuoteRequestModel } from '@/models/QuoteRequest';

export default class QuotaRequestsService {
  private static instance: QuotaRequestsService;
  private constructor() {}
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new QuotaRequestsService();
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
}

export const quoteRequestService = QuotaRequestsService.getInstance();
