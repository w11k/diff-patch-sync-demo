import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Todo} from "../todo/todo";

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent implements OnInit, OnChanges{

  @Input() todo: Todo;

  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();

  @Output()
  update: EventEmitter<Todo> = new EventEmitter();

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
        title: new FormControl('', Validators.required),
        complete: new FormControl(),
      }
    );
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.todo.currentValue) {
      this.form.patchValue(this.todo as any);
    }
  }

  toggleTodoComplete() {
    this.todo = { ...this.todo, complete: !this.todo.complete };
    if (this.form.valid) {
      this.update.emit(this.todo)
    }
  }

  keyup(event) {
    if (event.key === "Enter")
      this.updateTodo();
  }

  removeTodo() {
    this.remove.emit(this.todo);
  }

  updateTodo() {
    this.todo = { ...this.todo, title: this.form.get('title').value as string };
    if (this.form.valid) {
      this.update.emit(this.todo)
    }
  }
}
