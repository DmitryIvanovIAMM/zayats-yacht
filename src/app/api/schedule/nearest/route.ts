import { queryNearestShippingsAction } from '@/app/server-actions/serverActions';

function getAllowedOrigin(request: Request) {
  const origin = request.headers.get('origin');
  // eslint-disable-next-line no-console
  console.log('getAllowedOrigin().  origin: ', origin);
  if (origin && origin.startsWith('http://localhost')) {
    return origin;
  }
  return '';
}

export async function GET(request: Request) {
  const schedule = await queryNearestShippingsAction(new Date());
  const allowedOrigin = getAllowedOrigin(request);
  // eslint-disable-next-line no-console
  console.log('GET allowedOrigin: ', allowedOrigin);

  return new Response(JSON.stringify(schedule), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      //...(allowedOrigin && { 'Access-Control-Allow-Origin': allowedOrigin }),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS, HEAD, PUT, POST, DELETE',
      'Access-Control-Allow-Headers':
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    }
  });
}

export function OPTIONS(request: Request) {
  const allowedOrigin = getAllowedOrigin(request);
  // eslint-disable-next-line no-console
  console.log('OPTIONS allowedOrigin: ', allowedOrigin);

  return new Response(null, {
    status: 200
  });
}

// export function OPTIONS(request: Request) {
//   // const allowedOrigin = getAllowedOrigin(request);
//
//   return new Response(null, {
//     status: 204,
//     // headers: {
//     //   ...(allowedOrigin && { 'Access-Control-Allow-Origin': allowedOrigin }),
//     //   'Access-Control-Allow-Methods': 'GET, OPTIONS',
//     //   'Access-Control-Allow-Headers': 'Content-Type'
//     // }
//     headers: {
//       'Content-Type': 'application/json',
//       //...(allowedOrigin && { 'Access-Control-Allow-Origin': allowedOrigin }),
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET, OPTIONS, HEAD, PUT, POST, DELETE',
//       'Access-Control-Allow-Headers':
//         'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//     }
//   });
// }
