import { ProjectStack } from 'src/project/entity/project-stack.entity';

export interface IAuthFields {
  role?: string;
  email?: string;
  nickname?: string;
  image?: string;
  stack?: ProjectStack;
}
