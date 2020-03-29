import {DBConfig, NgxIndexedDBModule} from 'ngx-indexed-db';
import {NgModule} from "@angular/core";

const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 14,
  objectStoresMeta: [
    {
      store: 'todo',
      storeConfig: {keyPath: 'id', autoIncrement: true},
      storeSchema: [
        {name: 'id', keypath: 'id', options: {unique: true}},
        {name: 'title', keypath: 'title', options: {unique: false}},
        {name: 'complete', keypath: 'complete', options: {unique: false}},
        {name: 'createdAt', keypath: 'createdAt', options: {unique: false}},
        {name: 'updatedAt', keypath: 'updatedAt', options: {unique: false}},
      ]
    },
    {
      store: 'document',
      storeConfig: {keyPath: 'id', autoIncrement: true},
      storeSchema: [
        {name: 'payload', keypath: 'payload', options: {unique: false}},
      ]
    }
  ]
};

@NgModule({
  imports: [
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
})
export class LocalStoreApiModule {
}
