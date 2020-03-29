import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import {Observable} from "rxjs";
import { of } from 'rxjs';
import {Todo} from "../../todo/todo";
import {LOCAL_API_MOCK_DATA_CLIENT} from "./local-store-api.mock";


@Injectable()
export class LocalStoreApiServiceMock {

  constructor(
  ) {
  }

  public getAllTodos(): Observable<Todo[]> {
    return of(LOCAL_API_MOCK_DATA_CLIENT.todos);
  }

  public createTodo(todo: Todo): Observable<Todo[]> {
    return of(LOCAL_API_MOCK_DATA_CLIENT.todos);
  }

  public getTodoById(todoId: number): Observable<Todo[]> {
    return of(LOCAL_API_MOCK_DATA_CLIENT.todos);
  }

  public updateTodo(todo: Todo): Observable<Todo[]> {
    return of(LOCAL_API_MOCK_DATA_CLIENT.todos);
  }

  public deleteTodoById(todoId: number): Observable<Todo[]> {
    return of(LOCAL_API_MOCK_DATA_CLIENT.todos);
  }
}
