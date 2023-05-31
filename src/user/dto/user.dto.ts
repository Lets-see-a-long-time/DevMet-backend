import { Project } from 'src/project/entity/project.entity';
import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';
export class UserDTO {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  userId: string;

  @IsString()
  email: string;

  @IsString()
  image: string;

  @IsString()
  nickname: string;

  @IsString()
  role: string;

  @IsString()
  stack: string;

  @IsString()
  expires: string;

  @IsString()
  provider: string;

  @IsArray()
  projects: Project[];

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
