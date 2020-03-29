/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { TodoListComponent } from './todo-list.component';
import {Todo} from "../todo/todo";
import {ReactiveFormsModule} from "@angular/forms";

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [ TodoListComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
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
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    component.todos = [todo];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
