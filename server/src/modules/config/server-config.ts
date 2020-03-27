import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';

export interface ServerConfig {
  dbConfig: PostgresConnectionOptions;
  environment: 'dev' | 'prod';
}


