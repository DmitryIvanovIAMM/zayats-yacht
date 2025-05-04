import { QuoteRequest, QuoteRequestModel } from '@/models/QuoteRequest';

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
}

export const quoteRequestService = QuoteRequestsService.getInstance();
