import {Injectable} from '@nestjs/common';
import {throwNotFoundForNil} from "../../util/throw-not-found-for-nil";
import {Todo} from "./todo.entity";
import {TodoDto} from "./todo.dto";
import {MOCK_DATA_SOURCE_SERVER} from "./todo.mock";

@Injectable()
export class TodoServiceMock {

    // async getAll(): Promise<Todo[]> {
    //     return fakeDbGetAll();
    // }
    //
    // async getOne(id: number): Promise<Todo> {
    //     return fakeDbGetOne(id);
    // }
    //
    // async add(person: Partial<TodoDto>) {
    //     return fakeDbAdd(person);
    // }
    //
    // async update(id: number, updates: Partial<TodoDto>) {
    //     return fakeDbUpdate(id, updates);
    // }
    //
    // async remove(id: number) {
    //     return fakeDbRemove(id);
    // }

}

// async function fakeDbGetAll(): Promise<Todo[]> {
//     return MOCK_DATA_SOURCE_SERVER.todos;
// }
//
// async function fakeDbGetOne(id: number) {
//     const person = MOCK_DATA_SOURCE_SERVER.todos.find(it => it.id === id);
//     throwNotFoundForNil(person);
//     return person;
// }
//
// async function fakeDbAdd(person: Partial<Todo>) {
//     const highestId = MOCK_DATA_SOURCE_SERVER.todos.reduce((acc, current) => current.id > acc ? current.id : acc, 0);
//     const id = highestId + 1;
//     MOCK_DATA_SOURCE_SERVER.todos.push({...person, id} as Todo);
//     return fakeDbGetOne(id);
// }
//
// async function fakeDbUpdate(id: number, updates: Partial<Todo>): Promise<Todo> {
//
//     // check if id exists
//     await fakeDbGetOne(id);
//
//     // update
//     MOCK_DATA_SOURCE_SERVER.todos = MOCK_DATA_SOURCE_SERVER.todos.map(it => it.id === id ? {id, ...it, ...updates} as Todo : it);
//
//     // get again fresh from 'db'
//     return await fakeDbGetOne(id);
//
// }
//
// async function fakeDbRemove(id: number): Promise<void> {
//
//     // check if id exists
//     await fakeDbGetOne(id);
//
//     // remove from list
//     MOCK_DATA_SOURCE_SERVER.todos = MOCK_DATA_SOURCE_SERVER.todos.filter(it => it.id !== id);
// }
