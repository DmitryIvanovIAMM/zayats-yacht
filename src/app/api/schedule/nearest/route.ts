import { queryNearestShippingsAction } from '@/app/server-actions/serverActions';
import { getCORSHeaders } from '@/helpers/cors';

export async function GET(request: Request) {
  const schedule = await queryNearestShippingsAction(new Date());
  return new Response(JSON.stringify(schedule), {
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
