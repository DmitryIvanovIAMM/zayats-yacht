import type { NextApiRequest, NextApiResponse } from 'next';
import { getPortsAction } from '@/controllers/PortsController';

type ResponseData = {
  message: string;
};

// export default function handler(req: c, res: NextApiResponse<ResponseData>) {
//   const ports = await getPortsAction();
//   res.status(200).json({ message: 'Hello from Next.js!' });
// }

export async function GET(request: NextApiRequest) {
  // For example, fetch data from your DB here
  const ports = await getPortsAction();
  console.log('GE().  ports: ', ports);

  return new Response(JSON.stringify(ports), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
