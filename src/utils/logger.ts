import { createLogger, transports, format } from 'winston';

export const errorTransport = new transports.File({
  filename: 'logs/error.log',
  level: 'error'
});

export const combinedTransport = new transports.File({
  filename: 'logs/combined.log'
});

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    errorTransport,
    combinedTransport
  ],
  exitOnError: false // do not exit on handled exceptions
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
const { APP_ENV } = process.env;

if (APP_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple()
    })
  );
}

export default logger;
