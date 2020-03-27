import {Module} from '@nestjs/common';
import {LoggerModule} from "../logger/logger.module";
import {DatabaseModule} from "../database/database.module";
import {DiffPatchSyncService} from "./diff-patch-sync.service";
import {DiffPatchSyncController} from "./diff-patch-sync.controller";
import {todoProviders} from "../todo/todo.providers";
import {shadowProviders} from "../shadow/shadow.providers";

@Module({
    imports: [
        LoggerModule,
        DatabaseModule
    ],
    controllers: [DiffPatchSyncController],
    providers: [
        DiffPatchSyncService,
        ...todoProviders,
        ...shadowProviders,
    ],
})
export class DiffPatchSyncModule {
}
