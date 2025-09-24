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
  const response = await nextAuthHandler(request, context);
  console.log('GET response before CORS headers: ', response);
  console.log('Request headers: ', request.headers);
  const headers = getCORSHeaders(request);
  console.log('CORS headers to set: ', headers);
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value as string);
  });
  return response;
}

export async function POST(request: Request, context: any) {
  const response = await nextAuthHandler(request, context);
  const headers = getCORSHeaders(request);
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value as string);
  });
  return response;
}
