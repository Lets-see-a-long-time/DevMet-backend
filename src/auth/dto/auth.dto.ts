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

  @IsOptional()
  @IsString()
  role: string;

  @IsString()
  nickname: string;

  @IsOptional()
  @IsString()
  stack: string;

  @IsString()
  expires: string;
}
