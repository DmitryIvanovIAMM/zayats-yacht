// src/helpers/cors.ts

export function getAllowedOrigin(request: Request): string {
  const origin = request.headers.get('origin');
  // eslint-disable-next-line no-console
  console.log('§origin:', origin);
  return origin && /^https?:\/\/localhost(:\d+)?$/.test(origin) ? origin : '';
}

export function getCORSHeaders(request: Request): HeadersInit {
  const allowedOrigin = getAllowedOrigin(request);
  // eslint-disable-next-line no-console
  console.log('Allowed Origin:', allowedOrigin);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (allowedOrigin) {
    headers['Access-Control-Allow-Origin'] = allowedOrigin;
    headers['Access-Control-Allow-Credentials'] = 'true';
    headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS, HEAD, PUT, POST, DELETE';
    headers['Access-Control-Allow-Headers'] =
      'Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version';
    headers['Access-Control-Expose-Headers'] =
      'Authorization, Set-Cookie, Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version';
  }
  // eslint-disable-next-line no-console
  console.log('CORS Headers:', headers);
  return headers;
}
