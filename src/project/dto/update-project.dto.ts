import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  title?: string;

  @IsString()
  content?: string;

  @IsNotEmpty()
  tag?: string[];
}
