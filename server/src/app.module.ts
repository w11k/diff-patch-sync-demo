import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TodoModule} from './modules/todo/todo.module';
import {DatabaseModule} from "./modules/database/database.module";
import {ConfigModule} from "./modules/config/config.module";
import {DiffPatchSyncModule} from "./modules/diff-patch-sync/diff-patch-sync.module";

@Module({
  imports: [
      TodoModule,
      DiffPatchSyncModule,
      DatabaseModule,
      ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}