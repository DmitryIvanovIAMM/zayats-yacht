// src/helpers/cors.ts

export function getAllowedOrigin(request: Request): string {
  const origin = request.headers.get('origin');
  return origin && /^https?:\/\/localhost(:\d+)?$/.test(origin) ? origin : '';
}

export function getCORSHeaders(request: Request): HeadersInit {
  const allowedOrigin = getAllowedOrigin(request);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (allowedOrigin) {
    headers['Access-Control-Allow-Origin'] = allowedOrigin;
    headers['Access-Control-Allow-Credentials'] = 'true';
    headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS, HEAD, PUT, POST, DELETE';
    headers['Access-Control-Allow-Headers'] =
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version';
  }
  return headers;
}
