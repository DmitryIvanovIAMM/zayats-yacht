import { queryNearestShippingsAction } from '@/controllers/SchedulesController';

export async function GET() {
  const ports = await queryNearestShippingsAction(new Date());

  return new Response(JSON.stringify(ports), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
