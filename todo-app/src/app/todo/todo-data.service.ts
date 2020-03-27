import { Injectable } from '@angular/core';
import {from, Observable, of} from "rxjs";
import {SyncApiService} from "../services/sync-api/sync-api.service";
import {Todo} from "./todo";
import {ApiService} from "../services/http-api/api.service";

@Injectable()
export class TodoDataService {

  constructor(
    private api: SyncApiService,
  ) {
  }

  addTodo(todo: Todo): Observable<any> {
    return from(this.api.createTodo(todo));
  }

  deleteTodoById(todoId: string): Observable<any> {
    return from(this.api.deleteTodoById(todoId));
  }

  updateTodo(todo: Todo): Observable<any> {
    return from(this.api.updateTodo(todo));
  }

  getAllTodos(): Observable<Todo[]> {
    return from(this.api.getAllTodos());
  }
}
