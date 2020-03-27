import {Connection} from 'typeorm';
import {DbConnectionToken} from '../database/database.provider';
import {Todo} from "./todo.entity";

export const todoRepositoryToken = 'TodoRepositoryToken';
export const todoProviders = [
  {
    provide: todoRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(Todo),
    inject: [DbConnectionToken],
  },
];
