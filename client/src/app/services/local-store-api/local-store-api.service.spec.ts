import { TestBed } from '@angular/core/testing';

import { LocalStoreApiService } from './local-store-api.service';
import {LocalStoreApiServiceMock} from "./local-store-api.service.mock";

describe('LocalStoreApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: LocalStoreApiService,
        useClass: LocalStoreApiServiceMock
      }
    ]
  }));

  it('should be created', () => {
    const service: LocalStoreApiService = TestBed.get(LocalStoreApiService);
    expect(service).toBeTruthy();
  });
});
