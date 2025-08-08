import { NextRequest } from 'next/server';
import { getSchedulesAction } from '@/app/server-actions/serverActions';

export async function GET(request: NextRequest) {
  const scheduleParams = Object.fromEntries(request?.nextUrl?.searchParams);
  // eslint-disable-next-line no-console
  console.log('scheduleParams: ', scheduleParams);
  const schedule = await getSchedulesAction(scheduleParams);
  // eslint-disable-next-line no-console
  console.log('schedule: ', schedule);

  return new Response(JSON.stringify(schedule), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
