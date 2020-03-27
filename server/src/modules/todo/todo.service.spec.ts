import {Test, TestingModule} from '@nestjs/testing';
import {TodoService} from "./todo.service";
import {todoMockRepository} from "./todo.repository.mock";

describe('TodoService', () => {
    let service: TodoService;

    // @ts-ignore
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TodoService,
                todoMockRepository,
            ],
        }).compile();
        service = module.get<TodoService>(TodoService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
