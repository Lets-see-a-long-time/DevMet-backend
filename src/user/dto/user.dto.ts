import { Project } from 'src/project/entity/project.entity';

export interface UserDTO {
  id: string;
  name: string;
  userId: string;
  email: string;
  image: string;
  nickname: string;
  role: string;
  stack: string;
  expires: string;
  provider: string;
  projects: Project[];
  createdAt: Date;
  updatedAt: Date;
}
