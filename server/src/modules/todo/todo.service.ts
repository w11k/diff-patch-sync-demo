import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {MyLogger} from "../logger/logger.service";
import {Repository} from "typeorm";
import {todoRepositoryToken} from "./todo.providers";
import {Todo} from "./todo.entity";
import {TodoDto} from "./todo.dto";

@Injectable()
export class TodoService {

    constructor(@Inject(todoRepositoryToken) private readonly todoRepository: Repository<Todo>,
                private myLogger: MyLogger) {
    }

  async getAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async getOne(id: number): Promise<Todo> {
    const todo: Todo = await this.todoRepository.findOne(id);

    if (!todo) {
        throw new NotFoundException(`Couldn't find record with id: ${id}'`);
    }

    else return todo;
  }

  async add(todo: Partial<TodoDto>) {
    return await this.todoRepository.save(todo);
  }

  async update(id: number, updates: Partial<TodoDto>) {
    return await this.todoRepository.save(updates);
  }

  async remove(id: string): Promise<Todo> {
      const todo: Todo = await this.todoRepository.findOne({id: id});

      if (!todo) {
          throw new NotFoundException(`Couldn't find record with id: ${id}'`);
      }

      return await this.todoRepository.remove(todo);
  }

}