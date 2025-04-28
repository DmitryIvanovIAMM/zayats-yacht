import { getPortsAction } from '@/controllers/PortsController';

export async function GET() {
  const ports = await getPortsAction();

  return new Response(JSON.stringify(ports), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
