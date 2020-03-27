import {Injectable} from '@angular/core';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {from, Observable, of} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import {Todo} from "../../todo/todo";
import {ClientDoc} from "@w11k/diff-patch-sync/dist/core/diff-patch-sync-interfaces";

@Injectable()
export class LocalStoreApiService {

  constructor(private dbService: NgxIndexedDBService) {
  }

  createTodo(todo: Todo): Observable<Todo[]> {
    this.dbService.currentStore = 'todo';
    return from(this.dbService.add({...todo})).pipe(
      flatMap(_ => {
        return this.getAllTodos().pipe(
          map(todos => todos)
        )
      }));
  }

  updateTodo(todo: Todo): Observable<Todo[]> {
    this.dbService.currentStore = 'todo';
    return from(this.dbService.update({...todo})).pipe(
      flatMap(_ => {
        return this.getAllTodos().pipe(
          map(todos => todos)
        )
      }));
  }

  getAllTodos(): Observable<Todo[]> {
    this.dbService.currentStore = 'todo';
    return from(this.dbService.getAll());
  }

  getTodoById(id: number): Observable<Todo> {
    this.dbService.currentStore = 'todo';
    return from(this.dbService.getByKey(id));
  }

  deleteTodoById(id: string): Observable<Todo[]> {
    this.dbService.currentStore = 'todo';
    return from(this.dbService.delete(id)).pipe(
      flatMap(_ => {
        return this.getAllTodos().pipe(
          map(todos => todos)
        )
      }));
  }

  async updateDocument(document: ClientDoc<Todo>): Promise<any> {
    this.dbService.currentStore = 'document';
    console.log('update')
    return await this.dbService.update({payload: JSON.stringify(document), id: document.localShadow.clientReplicaId})
  }

  async saveDocument(document: ClientDoc<Todo>): Promise<any> {
    this.dbService.currentStore = 'document';
    console.log('save')
    return await this.dbService.add({payload: JSON.stringify(document), id: document.localShadow.clientReplicaId});
  }

  async getDocument(): Promise<ClientDoc<Todo>> {
    this.dbService.currentStore = 'document';
    const clientDocs = await this.dbService.getAll() as ClientDoc<Todo>[];
    const clientDoc = clientDocs.reduce((previousValue, currentValue) => currentValue, undefined);
    // @ts-ignore
    return clientDoc !== undefined ? JSON.parse(clientDoc.payload) as ClientDoc<Todo> : undefined;
  }
}
