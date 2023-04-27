import { IsOptional, IsString } from 'class-validator';

export class AuthDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsString()
  role: string;

  @IsString()
  nickname: string;

  @IsString()
  stack: string;

  @IsString()
  expires: string;
}
