import NextAuth from 'next-auth';
import { authOptions } from './authOptions';
import { getCORSHeaders } from '@/helpers/cors';

// CORS preflight handler
export async function OPTIONS(request: Request) {
  const headers = getCORSHeaders(request);
  return new Response(null, { status: 200, headers });
}

const nextAuthHandler = NextAuth(authOptions);

// Wrap GET and POST to set CORS headers
export async function GET(request: Request, context: any) {
  // eslint-disable-next-line no-console
  console.log('[nextauth] GET', request.method, request.url);
  const response = await nextAuthHandler(request, context);
  // eslint-disable-next-line no-console
  console.log('[nextauth] GET response.headers', response.headers);
  const corsHeaders = getCORSHeaders(request);
  // eslint-disable-next-line no-console
  console.log('[nextauth] GET CORS headers', corsHeaders);
  // Merge CORS headers with existing response headers
  const newHeaders = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    newHeaders.set(key, value as string);
  });
  // eslint-disable-next-line no-console
  console.log('[nextauth] GET newHeaders', newHeaders);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}

export async function POST(request: Request, context: any) {
  // eslint-disable-next-line no-console
  console.log('[nextauth] POST request.body: ', await request.clone().text());
  // eslint-disable-next-line no-console
  console.log('[nextauth] POST request.headers: ', request.headers);
  // eslint-disable-next-line no-console
  console.log('[nextauth] POST request.cookies: ', request.headers.get('cookie'));
  // eslint-disable-next-line no-console
  console.log('[nextauth] POST. request.headers: ', request.headers);
  const response = await nextAuthHandler(request, context);
  // eslint-disable-next-line no-console
  console.log('[nextauth] POST response.heders: ', response.headers);
  const corsHeaders = getCORSHeaders(request);
  // eslint-disable-next-line no-console
  console.log('[nextauth] POST CORS headers: ', corsHeaders);
  const newHeaders = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    newHeaders.set(key, value as string);
  });
  // eslint-disable-next-line no-console
  console.log('[nextauth] POST newHeaders: ', newHeaders);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}
