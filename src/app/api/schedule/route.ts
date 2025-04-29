import { NextRequest } from 'next/server';
import { getSchedules } from '@/controllers/SchedulesController';

export async function GET(request: NextRequest) {
  const scheduleParams = Object.fromEntries(request?.nextUrl?.searchParams);
  const schedule = await getSchedules(scheduleParams);
  return new Response(JSON.stringify(schedule), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
