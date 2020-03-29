/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListItemComponent } from './todo-list-item.component';
import {Todo} from "../todo/todo";
import {ReactiveFormsModule} from "@angular/forms";

describe('TodoListItemComponent', () => {
  let component: TodoListItemComponent;
  let fixture: ComponentFixture<TodoListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [ TodoListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const todo: Todo = {
      id: 'd8c90120-32e6-11ea-b477-11813a6a1707',
      title: 'Testing changes things.',
      complete: false,
      createdAt: '2019-07-18 07:49:54.646251',
      updatedAt: '2019-07-18 07:49:54.646251',
    };
    fixture = TestBed.createComponent(TodoListItemComponent);
    component = fixture.componentInstance;
    component.todo = todo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
