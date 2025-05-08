import pino, { Logger } from 'pino';

const logger: Logger =
  process.env['APP_ENV'] === 'prod'
    ? pino({ level: 'warn' })
    : pino({
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true
          }
        },
        level: 'debug'
      });

export default logger;
