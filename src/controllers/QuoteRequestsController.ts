import { QuoteRequestModel } from '@/models/QuoteRequest';

export const getQuoteRequests = async () => {
  const quoteRequests = await QuoteRequestModel.find({});

  return quoteRequests.map((quoteRequest) => ({
    _id: quoteRequest._id.toString(),
    fromEmail: quoteRequest.fromEmail,
    receivedAt: quoteRequest.receivedAt,
    requestData: quoteRequest.requestData
  }));
};
