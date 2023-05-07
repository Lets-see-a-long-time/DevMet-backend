import { IsOptional, IsString } from 'class-validator';

export class AuthDTO {
  @IsString()
  userId: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  stack?: string;

  @IsOptional()
  @IsString()
  expires?: string;
}
