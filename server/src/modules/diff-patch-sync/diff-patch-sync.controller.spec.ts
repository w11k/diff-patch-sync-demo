import {Test, TestingModule} from '@nestjs/testing';
import {DiffPatchSyncController} from "./diff-patch-sync.controller";

describe('Crdt Controller', () => {
    let module: TestingModule;

    // @ts-ignore
    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [DiffPatchSyncController],
            // providers: [
            //     {
                    // provide: CrdtService,
                    // useClass: TodoServiceMock,
                // },
            // ]
        }).compile();
    });
    it('should be defined', () => {
        const controller: DiffPatchSyncController = module.get<DiffPatchSyncController>(DiffPatchSyncController);
        expect(controller).toBeDefined();
    });
});
