import { QuoteRequestModel } from '@/models/QuoteRequest';

export const getQuoteRequests = async () => {
  const quoteRequests = await QuoteRequestModel.find({});

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
    total: quoteRequestsFrontend.length
  };
};
