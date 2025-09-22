import { queryNearestShippingsAction } from '@/app/server-actions/serverActions';

function getAllowedOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin.startsWith('http://localhost')) {
    return origin;
  }
  return '';
}

export async function GET(request: Request) {
  const schedule = await queryNearestShippingsAction(new Date());
  const allowedOrigin = getAllowedOrigin(request);

  return new Response(JSON.stringify(schedule), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...(allowedOrigin && { 'Access-Control-Allow-Origin': allowedOrigin }),
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

export function OPTIONS(request: Request) {
  const allowedOrigin = getAllowedOrigin(request);

  return new Response(null, {
    status: 204,
    headers: {
      ...(allowedOrigin && { 'Access-Control-Allow-Origin': allowedOrigin }),
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
