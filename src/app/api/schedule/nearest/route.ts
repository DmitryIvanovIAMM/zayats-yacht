import { queryNearestShippingsAction } from '@/app/server-actions/serverActions';

function getAllowedOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return origin && /^https?:\/\/localhost(:\d+)?$/.test(origin) ? origin : '';
}

function getCORSHeaders(request: Request) {
  const allowedOrigin = getAllowedOrigin(request);
  return allowedOrigin
    ? {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, OPTIONS, HEAD, PUT, POST, DELETE',
        'Access-Control-Allow-Headers':
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
      }
    : {};
}

export async function GET(request: Request) {
  const schedule = await queryNearestShippingsAction(new Date());
  return new Response(JSON.stringify(schedule), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...getCORSHeaders(request)
    }
  });
}

export function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...getCORSHeaders(request)
    }
  });
}
