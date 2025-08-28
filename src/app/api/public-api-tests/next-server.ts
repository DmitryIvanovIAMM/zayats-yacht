import { spawn } from 'child_process';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';

/* eslint-disable no-console */

let nextProcess: any;
let storedMongoUri: string | undefined;

export async function startNextServer(port = 3000) {
  const inMemoryDBRunner = new InMemoryDBRunner();
  const uri = await inMemoryDBRunner.connectToInMemoryDBAndLoadTestData();
  storedMongoUri = process.env.MONGO_URI;

  nextProcess = spawn('npx', ['next', 'dev', '-p', port.toString()], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      NODE_ENV: 'test',
      MONGODB_URI: uri
    },
    stdio: ['pipe', 'pipe', 'pipe']
  });

  await new Promise<void>((resolve, reject) => {
    let ready = false;

    nextProcess.stdout.on('data', (data: Buffer) => {
      const msg = data.toString();
      if (msg.includes('Ready in')) {
        ready = true;
        resolve();
      }
    });

    nextProcess.stderr.on('data', (data: Buffer) => {
      console.error('Next.js stderr:', data.toString());
    });

    nextProcess.on('error', reject);

    setTimeout(() => {
      if (!ready) reject(new Error('Next.js server did not start in time'));
    }, 70000);
  });

  return { port, inMemoryDBRunner };
}

export async function stopNextServer(inMemoryDBRunner?: InMemoryDBRunner) {
  if (inMemoryDBRunner) {
    await inMemoryDBRunner.closeDatabase();
  }
  process.env.MONGO_URI = storedMongoUri;

  if (nextProcess) {
    return new Promise<void>((resolve) => {
      nextProcess?.stdout?.destroy();
      nextProcess?.stderr?.destroy();

      nextProcess?.on('exit', () => {
        nextProcess = null;
        resolve();
      });

      nextProcess?.kill('SIGTERM');

      setTimeout(() => {
        if (nextProcess) {
          try {
            process.kill(nextProcess.pid!, 'SIGKILL');
          } catch (e) {
            console.log('Next.js process already terminated.  Error: ', e);
          }
          nextProcess = null;
        }
        resolve();
      }, 5000).unref(); // 👈 This timer doesn't block Jest
    });
  }
}
