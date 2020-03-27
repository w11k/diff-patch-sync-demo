import {Module} from '@nestjs/common';
import {logProv} from './logger.providers';
import {MyLogger} from './logger.service';

@Module({
  providers: [
    ...logProv,
    MyLogger
  ],
  exports: [
    ...logProv,
    MyLogger
  ]
})
export class LoggerModule {
}
