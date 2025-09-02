import 'ts-node';
import 'tsconfig-paths/register';
import { stopNextServer } from '@/test-helpers/test-next-server';

export default async function teardown() {
  await stopNextServer(); // 👈 передаём явно
}
