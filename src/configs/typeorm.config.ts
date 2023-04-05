import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.SQL_USERNAME || dbConfig.username,
  password: process.env.SQL_PASSWORD || dbConfig.password,
  database: process.env.SQL_DATABASE || dbConfig.database,
  entities: ['dist/*/entity/*.entity.{ts,js}'],
  synchronize: true,
  timezone: '+09:00',
};
