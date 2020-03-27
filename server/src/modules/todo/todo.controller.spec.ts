import {Test, TestingModule} from '@nestjs/testing';
import {TodoController} from "./todo.controller";
import {TodoService} from "./todo.service";
import {TodoServiceMock} from "./todo.service.mock";

describe('Todo Controller', () => {
    let module: TestingModule;

    // @ts-ignore
    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [TodoController],
            providers: [
                {
                    provide: TodoService,
                    useClass: TodoServiceMock,
                },
            ]
        }).compile();
    });
    it('should be defined', () => {
        const controller: TodoController = module.get<TodoController>(TodoController);
        expect(controller).toBeDefined();
    });
});
