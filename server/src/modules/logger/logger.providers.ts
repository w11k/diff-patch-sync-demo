import {Winston} from 'winston';

export const WINSTON_INJECT_TOKEN = 'WINSTON';
export const LOGGER_TOKEN = 'LOGGER';

export const logProv = [
  /**
   * Provides Winston, should only be used in this module*/
  {
    provide: WINSTON_INJECT_TOKEN,
    useFactory: () => {
      return require('winston');
    }
  },
  /**
   * Provides an actual logger that is used in logger.service.ts */
  {
    provide: LOGGER_TOKEN,
    useFactory: (winston: Winston) => {
      return new (winston.Logger)({
        transports: [
          new (winston.transports.Console)(),
          // todo Klären wie die Logs gespeichert werden, stdout ausreichend?
          // new (winston.transports.File)({filename: 'somefile.log'})
        ]
      });
    },
    inject: [WINSTON_INJECT_TOKEN],
  },
];
