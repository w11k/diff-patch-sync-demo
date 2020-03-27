import {Module} from '@nestjs/common';
import {TodoController} from './todo.controller';
import {TodoService} from './todo.service';
import {todoProviders} from "./todo.providers";
import {LoggerModule} from "../logger/logger.module";
import {DatabaseModule} from "../database/database.module";
import {TodoServiceMock} from "./todo.service.mock";

@Module({
    imports: [
        LoggerModule,
        DatabaseModule
    ],
    controllers: [TodoController],
    providers: [
        TodoService,
        TodoServiceMock,
        ...todoProviders
    ],
})
export class TodoModule {
}
