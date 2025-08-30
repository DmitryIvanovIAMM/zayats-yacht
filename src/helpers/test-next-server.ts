import { spawn } from 'child_process';
import InMemoryDBRunner from '@/modules/mongoose/InMemoryDBRunner';
import getPort from 'get-port'; // 👈 use "get-port": "^5.1.1" because it is not ESM

/* eslint-disable no-console */

let nextProcess: any;
let InMemoryDBRunnerInstance: InMemoryDBRunner;

export async function startNextServer() {
  const port = await getPort(); // 👈free port
  console.log('Starting Next.js server on port ', port);

  const inMemoryDBRunner = new InMemoryDBRunner();
  InMemoryDBRunnerInstance = inMemoryDBRunner;
  const uri = await inMemoryDBRunner.connectToInMemoryDBAndLoadTestData();

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
      console.error(`[Next.js stderr port:${port}]:`, data.toString());
    });

    nextProcess.on('error', reject);

    setTimeout(() => {
      if (!ready) reject(new Error(`Next.js server did not start in time on port ${port}`));
    }, 60000);
  });

  return { port, url: `http://localhost:${port}`, inMemoryDBRunner, process: nextProcess };
}

export async function stopNextServer() {
  if (InMemoryDBRunnerInstance) {
    await InMemoryDBRunnerInstance.closeDatabase();
  }

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
