import 'ts-node';
import 'tsconfig-paths/register';
import { startNextServer } from '@/test-helpers/test-next-server';

export default async function setup() {
  const { url, port, proc, inMemoryDBRunner } = await startNextServer();
  global.__NEXT_SERVER__ = { url, port, proc, inMemoryDBRunner };
}
