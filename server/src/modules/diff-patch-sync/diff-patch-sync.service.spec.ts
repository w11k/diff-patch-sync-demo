import {Test, TestingModule} from '@nestjs/testing';

import { DiffPatchSyncService } from './diff-patch-sync.service';

describe('DiffPatchSyncService', () => {
    let service: DiffPatchSyncService;

    // @ts-ignore
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DiffPatchSyncService,
            ],
        }).compile();
        service = module.get<DiffPatchSyncService>(DiffPatchSyncService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
