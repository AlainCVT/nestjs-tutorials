import { utilities, WinstonModuleOptions } from 'nest-winston';
import { createLogger, format, transports } from 'winston';

export const winstonConfig: WinstonModuleOptions = {
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stacks: true }),
        format.ms(),
        utilities.format.nestLike('UserApp', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
    new transports.File({
      filename: 'logs/app.log',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stacks: true }),
        format.json(),
      ),
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stacks: true }),
        format.json(),
      ),
    }),
  ],
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  exitOnError: false,
};

export const logger = createLogger(winstonConfig);
