import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListFooterComponent } from './todo-list-footer/todo-list-footer.component';
import { TodoListHeaderComponent } from './todo-list-header/todo-list-header.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LocalStoreApiModule} from "./services/local-store-api/local-store-api.module";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {LocalStoreApiService} from "./services/local-store-api/local-store-api.service";
import {ApiMockService} from "./services/http-api/api-mock.service";
import {ApiService} from "./services/http-api/api.service";
import {TodoDataService} from "./todo/todo-data.service";
import {ConnectionModule} from "./services/connection/connection.module";
import {ConnectionService} from "./services/connection/connection.service";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {SyncApiModule} from "./services/sync-api/sync-api.module";
import {SyncApiService} from "./services/sync-api/sync-api.service";
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";
import {MatCardModule, MatListModule, MatProgressSpinnerModule} from "@angular/material";


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoListFooterComponent,
    TodoListHeaderComponent,
    TodoListItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LocalStoreApiModule,
    ConnectionModule,
    SyncApiModule,
    MatSlideToggleModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG}),
  ],
  providers:
    [
      TodoDataService,
      ApiService,
      ApiMockService,
      LocalStoreApiService,
      ConnectionService,
      SyncApiService,
    {provide: HTTP_INTERCEPTORS,
      useClass: AppComponent, multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
