import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type, //Database 설정
  host: 'localhost',
  port: dbConfig.port,
  username: process.env.DB_USERNAME || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  database: process.env.DB_DATABASE || dbConfig.database,
  // entities: ['dist/**/*.entity.{ts,js}'], // Entity 연결
  entities: [__dirname + '../../**/*.entity.{js,ts}'],
  synchronize: true,
  timezone: '+09:00',
};
