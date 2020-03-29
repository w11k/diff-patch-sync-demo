/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {TodoDataService} from './todo-data.service';
import {ApiService} from "../services/http-api/api.service";
import {ApiMockService} from "../services/http-api/api-mock.service";
import {SyncApiService} from "../services/sync-api/sync-api.service";
import {SyncApiServiceMock} from "../services/sync-api/sync-api.service.mock";
import {LocalStoreApiService} from "../services/local-store-api/local-store-api.service";
import {LocalApiMockService} from "../services/local-store-api/local-store-api-mock.service";
import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NGXMapperService} from "ngx-logger";
import {HttpBackend} from "@angular/common/http";

describe('TodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoDataService,
        NGXLogger,
        NGXMapperService,
        HttpBackend,
        NGXLoggerHttpService,
        LoggerConfig,
        {
          provide: ApiService,
          useClass: ApiMockService
        },
        {
          provide: SyncApiService,
          useClass: SyncApiServiceMock
        },
        {
          provide: LocalStoreApiService,
          useClass: LocalApiMockService
        }
      ]
    });
  });

  it('should ...', inject([TodoDataService], (service: TodoDataService) => {
    expect(service).toBeTruthy();
  }));

});
