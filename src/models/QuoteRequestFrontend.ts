export interface QuoteRequestFrontend {
  _id: string;
  fromUserId: string;
  fromName: string;
  fromEmail: string;
  receivedAt: string;
  requestData: object;
}
