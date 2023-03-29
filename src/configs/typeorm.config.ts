import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { DevMetDatabaseModel } from 'src/DMet/common/mysql/database.model';
import { Project } from 'src/DMet/project/domain/entity/project.entity';
const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql', //Database 설정
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  database: process.env.DB_DATABASE || dbConfig.database,
  // entities: ['dist/**/*.entity.{ts,js}'], // Entity 연결
  // entities: [__dirname + '../domain/entity/*.entity.{js,ts}'],
  entities: DevMetDatabaseModel,
  synchronize: true,
  timezone: '+09:00',
};
