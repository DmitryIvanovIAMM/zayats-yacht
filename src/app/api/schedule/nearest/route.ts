import { queryNearestShippingsAction } from '@/app/serverActions';

export async function GET() {
  const schedule = await queryNearestShippingsAction(new Date());

  return new Response(JSON.stringify(schedule), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
