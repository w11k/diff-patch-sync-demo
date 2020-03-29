import { TestBed, async } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {TodoDataService} from "./todo/todo-data.service";
import {ApiService} from "./services/http-api/api.service";
import {ApiMockService} from "./services/http-api/api-mock.service";
import {SyncApiService} from "./services/sync-api/sync-api.service";
import {ConnectionService} from "./services/connection/connection.service";
import {LocalStoreApiService} from "./services/local-store-api/local-store-api.service";
import {LocalApiMockService} from "./services/local-store-api/local-store-api-mock.service";
import {ConnectionMockService} from "./services/connection/connection-mock.service";
import {CrdtApiService} from "./services/crdt-api/crdt-api.service";
import {CrdtApiMockService} from "./services/crdt-api/crdt-api-mock.service";
import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NGXMapperService} from "ngx-logger";
import {HttpBackend} from "@angular/common/http";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
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
          useClass: ApiMockService
        },
        {
          provide: ConnectionService,
          useClass: ConnectionMockService
        },
        {
          provide: LocalStoreApiService,
          useClass: LocalApiMockService
        },
        {
          provide: CrdtApiService,
          useClass: CrdtApiMockService
        }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
