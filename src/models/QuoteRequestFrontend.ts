export interface QuoteRequestFrontend {
  _id: string | null;
  fromUserId: string;
  fromName: string;
  fromEmail: string;
  receivedAt: string;
  requestData: object;
}
