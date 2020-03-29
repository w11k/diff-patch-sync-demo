import {Observable} from "rxjs";
import {Todo} from "../todo/todo";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map} from "rxjs/operators";
import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import {v1} from "uuid";

@Component({
  selector: 'app-todo-list-header',
  templateUrl: './todo-list-header.component.html',
  styleUrls: ['./todo-list-header.component.scss']
})
export class TodoListHeaderComponent implements OnInit, OnChanges {

  newTodo: Todo;
  form: FormGroup;
  connection: boolean;

  @Input()
  connStatus$: Observable<boolean>;

  @Output()
  add: EventEmitter<Todo> = new EventEmitter();

  @Output()
  switchManualConnectionStatus: EventEmitter<boolean> = new EventEmitter();

  @Output()
  swipeDownEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    this.form = new FormGroup({
        title: new FormControl('', Validators.required),
      }
    );
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.connStatus$.pipe(
      map((status: boolean) => {
        this.connection = status;
      })
    ).subscribe()
  }

  resetErrors() {
    this.form.controls['title'].setErrors(null);
  }

  resetForm() {
    this.form.controls['title'].reset();
  }

  keyup(event) {
    if (event.key === "Enter")
      this.addTodo();
  }

  toggleConnection() {
    this.connection = !this.connection;
    this.switchManualConnectionStatus.emit(this.connection)
  }

  swipeDown($event) {
    this.swipeDownEmitter.emit($event)
  }

  addTodo() {
    this.newTodo = new Todo(v1(), this.form.get('title').value, false);
    
    if (this.form.valid) {
      this.resetForm();
      this.add.emit(this.newTodo)
    } else {
      this.form.controls['title'].markAsDirty();
    }
  }
}
