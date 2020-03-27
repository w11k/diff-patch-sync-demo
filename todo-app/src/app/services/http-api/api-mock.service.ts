import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import {Observable} from "rxjs";
import { of } from 'rxjs';
import {Todo} from "../../todo/todo";
import {API_MOCK_DATA_CLIENT} from "./api.mock";
import {ApiService} from "./api.service";
import {Delta} from "jsondiffpatch";


@Injectable()
export class ApiMockService {

  constructor(
  ) {
  }

  public getAllTodos(): Observable<Todo[]> {
    return of(API_MOCK_DATA_CLIENT.todos);
  }

  public createTodo(todo: Todo): Observable<Todo[]> {
    return of(API_MOCK_DATA_CLIENT.todos);
  }

  public getTodoById(todoId: number): Observable<Todo[]> {
    return of(API_MOCK_DATA_CLIENT.todos);
  }

  public updateTodo(todo: Todo): Observable<Todo[]> {
    return of(API_MOCK_DATA_CLIENT.todos);
  }

  public deleteTodoById(todoId: number): Observable<Todo[]> {
    return of(API_MOCK_DATA_CLIENT.todos);
  }

  // public updateDiff(diff: Delta): Observable<Delta> {
  //   return this.http
  //     .patch<Delta>(API_URL + '/diff/', diff)
  // }
}
