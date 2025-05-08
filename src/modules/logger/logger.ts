import pino from 'pino';

// const logger: Logger =
//   process.env['APP_ENV'] === 'prod'
//     ? pino({ level: 'warn' })
//     : pino({
//         transport: {
//           target: 'pino-pretty',
//           options: {
//             colorize: true
//           }
//         },
//         level: 'debug'
//       });

const isProduction = process.env.APP_ENV === 'prod' || process.env.APP_ENV === 'test';

const logger = pino({
  level: isProduction ? 'info' : 'debug',
  browser: {
    asObject: true,
    write: (o) => {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(o));
    }
  },
  // Configure for both environments without worker threads
  transport: {
    target: isProduction ? 'pino' : 'pino-pretty',
    options: {
      colorize: !isProduction,
      translateTime: 'SYS:standard',
      ignore: 'pid'
    }
  }
});

export default logger;
