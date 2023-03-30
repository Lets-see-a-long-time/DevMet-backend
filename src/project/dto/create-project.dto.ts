import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNotEmpty()
  tag?: string[];
}
