import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { User } from 'src/auth/entity/user.entity';
import { Comment } from 'src/project/entity/comment.entity';
import { Favorites } from 'src/project/entity/favorite.entity';
import { LikeComment } from 'src/project/entity/like-comment.entity';
import { Like } from 'src/project/entity/like.entity';
import { ProjectPosition } from 'src/project/entity/project-position.entity';
import { ProjectStack } from 'src/project/entity/project-stack.entity';
import { Project } from 'src/project/entity/project.entity';
import { Stack } from 'src/project/entity/stack.entity';
import { Tag } from 'src/project/entity/tag.entity';

const dbConfig = config.get('db');
const entityArray = [
  User,
  Project,
  Comment,
  Like,
  Favorites,
  Stack,
  ProjectStack,
  ProjectPosition,
  Tag,
  LikeComment,
];

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
