import { NextRequest } from 'next/server';
import { sendQuoteRequestAction } from '@/app/server-actions/serverActions';

export async function POST(request: NextRequest) {
  const body = await request.json();
  // eslint-disable-next-line no-console
  console.log('quoteRequest body: ', body);

  const quoteRequestResult = await sendQuoteRequestAction(body);
  // eslint-disable-next-line no-console
  console.log('quoteRequestResult: ', quoteRequestResult);

  return new Response(JSON.stringify(quoteRequestResult), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
