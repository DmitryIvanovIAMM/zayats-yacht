// global.d.ts
import type { ChildProcess } from 'child_process';
import type { InMemoryDBRunner } from '@/helpers/InMemoryDBRunner'; // поправь путь под свой проект

declare global {
  // Расширяем типизацию Node.js Global
  // eslint-disable-next-line no-var
  var __NEXT_SERVER__:
    | {
        url: string;
        port: number;
        proc: ChildProcess;
        inMemoryDBRunner: InMemoryDBRunner;
      }
    | undefined;
}

export {};
