import {Todo} from "./todo";

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new Todo()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const todo: Todo = {
      id: 'd8c90120-32e6-11ea-b477-11813a6a1707',
      title: 'Testing changes things.',
      complete: false,
      createdAt: '2019-07-18 07:49:54.646251',
      updatedAt: '2019-07-18 07:49:54.646251',
    };
    expect(todo.id).toEqual('d8c90120-32e6-11ea-b477-11813a6a1707');
    expect(todo.title).toEqual('Testing changes things.');
    expect(todo.complete).toEqual(false);
    expect(todo.createdAt).toEqual('2019-07-18 07:49:54.646251');
    expect(todo.updatedAt).toEqual('2019-07-18 07:49:54.646251');
  });
});
