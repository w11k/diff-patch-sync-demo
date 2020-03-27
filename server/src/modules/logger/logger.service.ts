import {Winston} from 'winston';
import {Inject, Injectable} from '@nestjs/common';
import {LOGGER_TOKEN} from './logger.providers';

@Injectable()
export class MyLogger {

  constructor(@Inject(LOGGER_TOKEN) private winston: Winston) {
  }

  public info(message: string) {
    this.winston.info(message);
  }

  public error(message: string, trace = '') {
    this.winston.error(message, trace);
  }

  public warn(message: string) {
    this.winston.warn(message);
  }
}
