import {Module} from '@nestjs/common';
import {databaseProviders} from './database.provider';
import {ConfigModule} from '../config/config.module';


@Module({
  providers: [...databaseProviders],
  imports: [ConfigModule],
  exports: [...databaseProviders],

})
export class DatabaseModule {
}
