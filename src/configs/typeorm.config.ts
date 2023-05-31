import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { User } from 'src/auth/entity/user.entity';
import { Comment } from 'src/project/entity/comment.entity';
import { Project } from 'src/project/entity/project.entity';

const dbConfig = config.get('db');
const entityArray = [User, Project, Comment];

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
