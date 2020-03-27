import {Component, OnInit} from '@angular/core';
import {TodoDataService} from "./todo/todo-data.service";
import {Observable, ReplaySubject} from "rxjs";
import {ConnectionService} from "./services/connection/connection.service";
import {flatMap, map, take} from "rxjs/operators";
import {Todo} from "./todo/todo";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TodoDataService]
})
export class AppComponent implements OnInit, HttpInterceptor {

  todos: Todo[] = [];
  connStatus$: Observable<boolean>;
  isLoading$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private todoDataService: TodoDataService, private connectionService: ConnectionService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.connectionService.getManualConnectionStatus()
      .pipe(
        take(1),
        flatMap(status => {
          if (status) {
            return next.handle(req)
          } else {
            throw HttpErrorResponse
          }
        })
      )
  }

  ngOnInit() {
    this.connStatus$ = this.connectionService.notifyWhenNetworkChanges()
      .pipe(
        flatMap((networkAvailable: boolean) => {
          return this.connectionService.getManualConnectionStatus()
            .pipe(
              map((manualConnectionStatus: boolean) => {
                return (networkAvailable && manualConnectionStatus);
              })
            )
        })
      );

    const todosOnNetworkChange$ = this.connStatus$
      .pipe(
        flatMap((status: boolean) => {
          console.info(`Your working in ${status ? 'ONLINE' : 'OFFLINE'} mode`);
          this.isLoading$.next(true);
          return this.todoDataService.getAllTodos().pipe(
            map((todos: Todo[]) => {
              return todos;
            }))
        }));

    todosOnNetworkChange$.subscribe((todos: Todo[]) => {
      this.todos = this.sortTodosByDate(todos);
      this.isLoading$.next(false);
    });
  }

  onAddTodo(todo) {
    this.isLoading$.next(true);
    this.todoDataService
      .addTodo(todo)
      .subscribe(
        (todos) => {
          // this.todos.push(todo);
          this.todos = this.sortTodosByDate(todos);
          this.isLoading$.next(false);
        }
      );
  }

  onRemoveTodo(todo) {
    this.isLoading$.next(true);
    this.todoDataService
      .deleteTodoById(todo.id)
      .subscribe(
        (todos) => {
          // this.todos = this.todos.filter(it => it.id !== todo.id);
          this.todos = this.sortTodosByDate(todos);
          this.isLoading$.next(false);
        }
      );
  }

  onUpdateTodo(todo) {
    this.isLoading$.next(true);
    this.todoDataService
      .updateTodo(todo)
      .subscribe(
        (todos) => {
          // this.todos.map(it => it.id === todo.id ? todo : it);
          this.todos = this.sortTodosByDate(todos);
          this.isLoading$.next(false);
        });
  }

  onSwitchConnection(manualConnectionStatus: boolean) {
    this.connectionService.setManualConnectionStatus(manualConnectionStatus);
  }

  onSwipeDown($event) {
    this.isLoading$.next(true);
    this.todoDataService
      .getAllTodos()
      .subscribe(
        (todos) => {
          this.todos = this.sortTodosByDate(todos);
          this.isLoading$.next(false);
        });
  }

  private sortTodosByDate(todos: Todo[]): Todo[] {
    return todos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}
