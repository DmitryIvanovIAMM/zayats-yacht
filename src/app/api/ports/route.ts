import { getPortsInRoutesAction } from '@/app/server-actions/serverActions';
import { getCORSHeaders } from '@/helpers/cors';

export async function GET(request: Request) {
  const ports = await getPortsInRoutesAction();
  return new Response(JSON.stringify(ports), {
    status: 200,
    headers: getCORSHeaders(request)
  });
}

export function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: getCORSHeaders(request)
  });
}
