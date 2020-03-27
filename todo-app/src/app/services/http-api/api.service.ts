import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Todo} from "../../todo/todo";
import {environment} from "../../../environments/environment";
import {Delta} from "jsondiffpatch";
import {EditsDTO} from "@w11k/diff-patch-sync/dist/core/diff-patch-sync-interfaces";

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  public getAllTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(API_URL + '/todo')
  }

  public createTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post<Todo>(API_URL + '/todo', todo)
  }

  public getTodoById(todoId: number): Observable<Todo> {
    return this.http
      .get<Todo>(API_URL + '/todo/' + todoId)
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http
      .patch<Todo>(API_URL + '/todo/' + todo.id, todo)
  }

  public deleteTodoById(todoId: string): Observable<Todo> {
    return this.http
      .delete<any>(API_URL + '/todo/' + todoId)
  }

  public async syncWithRemote(clientMessage: EditsDTO): Promise<EditsDTO> {
    return await this.http
      .patch<EditsDTO>(API_URL + '/sync', clientMessage).toPromise();
  }
}
