import winston from 'winston';

const level = process.env.LOG_LEVEL || 'debug';

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level,
      timestamp() {
        return new Date().toISOString();
      },
      colorize: true,
    }),
  ],
});

export default logger;
