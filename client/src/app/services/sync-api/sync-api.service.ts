import {Injectable} from '@angular/core';
import {LocalStoreApiService} from "../local-store-api/local-store-api.service";
import {ApiService} from "../http-api/api.service";
import {Todo} from "../../todo/todo";
import {
  ClientDoc,
  LocalStoreAdapter,
  EditsDTO
} from "@w11k/diff-patch-sync/dist/core/diff-patch-sync-interfaces";
import {DiffPatchSyncClient} from "@w11k/diff-patch-sync/dist/client/diff-patch-sync-client";
import {Observable, of} from "rxjs";

@Injectable()
export class SyncApiService implements LocalStoreAdapter<Todo> {

  client: DiffPatchSyncClient<Todo>;
  localStore: LocalStoreAdapter<Todo>;

  constructor(private api: ApiService, private localApi: LocalStoreApiService) {

    this.localStore = {
      getLocalData: this.getLocalData,
      storeLocalData: this.storeLocalData,
      updateLocalData: this.updateLocalData,
    };

    this.client = new DiffPatchSyncClient<Todo>(this.syncWithRemoteCallback, this.localStore);
    this.client.initData().then(_ => this.client.syncPeriodically(2000))
  }

  getAllTodos(): Observable<Todo[]> {
    return this.client.subscribeToChanges();
  }

  createTodo(todo: Todo): Observable<Todo[]> {
    this.client.create(todo);
    return of([]);
  }

  deleteTodoById(todoId: string): Observable<Todo[]> {
    this.client.removeById(todoId);
    return of([]);
  }

  updateTodo(todo: Todo): Observable<Todo[]> {
    const updatedItem = {
      ...todo,
      updatedAt: new Date().toISOString(),
    };

    this.client.updateById(todo.id, updatedItem);
    return of([]);
  }

  storeLocalData = async (document: ClientDoc<Todo>): Promise<any> => {
    return await this.localApi.saveDocument(document);
  };

  updateLocalData = async (document: ClientDoc<Todo>): Promise<any> => {
    return await this.localApi.updateDocument(document);
  };

  getLocalData = async (): Promise<any> => {
    return await await this.localApi.getDocument();
  };

  syncWithRemoteCallback = async (clientMessage: EditsDTO): Promise<EditsDTO> => {
    return await this.api.syncWithRemote(clientMessage);
  };
}
