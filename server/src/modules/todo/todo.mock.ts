import {Todo} from "./todo.entity";

export const todo1: Todo = {
    id: '1',
    title: 'test',
    complete: false,
    createdAt: '2019-07-18 07:49:54.646251',
    updatedAt: '2019-07-18 07:49:54.646251',
};

export const todo2: Todo = {
    id: '2',
    title: 'Shop a new shirt',
    complete: true,
    createdAt: '2019-08-18 07:49:54.646251',
    updatedAt: '2019-08-18 07:49:54.646251',
};

export const todo3: Todo = {
    id: '3',
    title: 'Create an appointment with Max',
    complete: false,
    createdAt: '2019-09-18 07:49:54.646251',
    updatedAt: '2019-09-18 07:49:54.646251',
};

export const todo4: Todo = {
    id: '4',
    title: 'Making car wash',
    complete: false,
    createdAt: '2019-10-18 07:49:54.646251',
    updatedAt: '2019-10-18 07:49:54.646251',
};

export const MOCK_DATA_SOURCE_SERVER = {
  todos: [
    todo1,
    todo2,
    todo3,
    todo4,
  ],
};

