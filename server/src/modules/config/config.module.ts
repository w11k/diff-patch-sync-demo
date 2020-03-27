import {Module} from '@nestjs/common';
import {configProviders} from './config.providers';
import {LoggerModule} from '../logger/logger.module';

@Module({
  providers: [
    ...configProviders,
  ],
  exports: [
    ...configProviders
  ],
  imports: [
    LoggerModule
  ]
})
export class ConfigModule {
}
