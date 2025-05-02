import { getActivePortsAction } from '@/app/serverActions';

export async function GET() {
  // use server action to get data  from backend
  // https://nextjs-faq.com/fetch-api-in-rsc
  const ports = await getActivePortsAction();

  return new Response(JSON.stringify(ports), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
