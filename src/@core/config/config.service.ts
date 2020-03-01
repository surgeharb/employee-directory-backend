import * as dotenv from 'dotenv';
import * as fs from 'fs';

import { join } from 'path';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const envConfig = dotenv.parse(fs.readFileSync('.env'));
    process.env.DEV_DBHOST = envConfig.DEV_DBHOST;
    process.env.NODE_ENV = envConfig.NODE_ENV;

    const TO_ROOT = '../../../';
    const ENV_PATH = join(__dirname, TO_ROOT, `config/env/${process.env.NODE_ENV}.env`);

    this.envConfig = dotenv.config({ path: ENV_PATH }).parsed || {};

    // Development Local Computer Testing -> Connection to Dev Database
    if (process.env.DEV_DBHOST && process.env.DEV_DBHOST !== 'undefined' && process.env.NODE_ENV === 'development') {
      this.envConfig.MONGODB_URI = this.envConfig.MONGODB_URI.replace('localhost', envConfig.DEV_DBHOST);
    }
  }

  public isProduction() {
    return (process.env.NODE_ENV === 'production');
  }

  public getEnv(key: string): string {
    return this.envConfig[key];
  }
}
