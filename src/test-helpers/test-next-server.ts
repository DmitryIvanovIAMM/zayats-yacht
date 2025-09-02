import { spawn } from 'child_process';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import getPort from 'get-port'; // 👈 use "get-port": "^5.1.1" because it is not ESM

/* eslint-disable no-console */

export async function startNextServer() {
  const port = await getPort();
  console.log('Starting Next.js server on port ', port);

  const inMemoryDBRunner = new InMemoryDBRunner();
  const uri = await inMemoryDBRunner.connectToInMemoryDBAndLoadTestData();

  const proc = spawn('npx', ['next', 'dev', '-p', port.toString()], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      NODE_ENV: 'test',
      MONGODB_URI: uri,
      SEND_EMAIL: 'false'
    },
    stdio: ['pipe', 'pipe', 'pipe']
  });

  await new Promise<void>((resolve, reject) => {
    let ready = false;

    proc.stdout.on('data', (data: Buffer) => {
      const msg = data.toString();
      if (msg.includes('Ready in')) {
        ready = true;
        resolve();
      }
    });

    proc.stderr.on('data', (data: Buffer) => {
      console.error(`[Next.js stderr port:${port}]:`, data.toString());
    });

    proc.on('error', reject);

    setTimeout(() => {
      if (!ready) reject(new Error(`Next.js server did not start in time on port ${port}`));
    }, 60000);
  });

  return { port, url: `http://localhost:${port}`, inMemoryDBRunner, proc };
}

export async function stopNextServer() {
  if (global.__NEXT_SERVER__) {
    const { proc, inMemoryDBRunner } = global.__NEXT_SERVER__;

    await inMemoryDBRunner.closeDatabase();

    return new Promise<void>((resolve) => {
      proc.once('exit', () => resolve());
      proc.kill('SIGTERM');

      setTimeout(() => {
        if (!proc.killed) {
          try {
            process.kill(proc.pid!, 'SIGKILL');
          } catch (e) {
            console.warn('Next.js already terminated:', e);
          }
        }
        resolve();
      }, 5000).unref();
    });
  }
}
