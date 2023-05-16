import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { Auth } from 'src/auth/entity/auth.entity';
import { Project } from 'src/project/entity/project.entity';

const dbConfig = config.get('db');
const entityArray = [Auth, Project];

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  database: process.env.DB_DATABASE || dbConfig.database,
  entities: entityArray,
  synchronize: true,
  timezone: '+09:00',
  logging: true,
};
