import {Connection} from 'typeorm';
import {DbConnectionToken} from '../database/database.provider';
import {Shadow} from "./shadow.entity";

export const shadowRepositoryToken = 'ShadowRepositoryToken';
export const shadowProviders = [
    {
        provide: shadowRepositoryToken,
        useFactory: (connection: Connection) => connection.getRepository(Shadow),
        inject: [DbConnectionToken],
    },
];
