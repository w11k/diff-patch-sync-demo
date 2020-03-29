import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {Todo} from "../todo/todo";

@Component(
  {
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
  }
)
export class TodoListComponent {

  @Input()
  todos: Todo[];

  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();

  @Output()
  update: EventEmitter<Todo> = new EventEmitter();

  constructor() {
  }

  onRemoveTodo(todo: Todo) {
    this.remove.emit(todo);
  }

  onUpdateTodo(todo: Todo) {
    this.update.emit(todo);
  }
}
