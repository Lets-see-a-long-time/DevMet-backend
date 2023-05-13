import { IsString } from 'class-validator';

export class CreateAuthDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  image: string;

  @IsString()
  provider: string;
}
