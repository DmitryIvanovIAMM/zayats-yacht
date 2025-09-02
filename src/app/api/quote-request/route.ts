import { NextRequest } from 'next/server';
import { sendQuoteRequestAction } from '@/app/server-actions/serverActions';

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Invalid JSON in request body:', err);
    return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
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
