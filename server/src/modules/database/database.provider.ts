import {createConnection} from 'typeorm';
import {ServerConfig} from '../config/server-config';
import {CONFIG_TOKEN} from '../config/config.providers';

export const DbConnectionToken = 'DbConnectionToken';

export const databaseProviders = [
  {
    provide: DbConnectionToken,
    useFactory: async (config: ServerConfig) => {
      return await createConnection({
        ...config.dbConfig,
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
      });
    },
    inject: [CONFIG_TOKEN],
  },
];
