import {ServerConfig} from './server-config';
import * as fs from 'fs';
import {MyLogger} from '../logger/logger.service';

const CONFIG_PATH = process.env.TCC_CONFIG_PATH ? process.env.TCC_CONFIG_PATH : process.cwd() + '/config.json';
export const CONFIG_TOKEN = 'TCC_CONFIG_TOKEN';

export async function getServerConfig(): Promise<ServerConfig> {
  return new Promise<ServerConfig>((resolve, reject) => {
    fs.readFile(CONFIG_PATH, 'utf8', function (err: any | null, data: string) {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data) as ServerConfig);
    });
  });
}

export const configProviders = [
  {
    provide: CONFIG_TOKEN,
    useFactory: async (myLogger: MyLogger) => {
      myLogger.info('Going to read config from...' + CONFIG_PATH);
      return await getServerConfig();
    },
    inject: [MyLogger],
  },
];
