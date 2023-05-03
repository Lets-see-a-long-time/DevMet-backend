import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TokenDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  picture: string;

  @IsString()
  sub: string;

  @IsNumber()
  iat: number;

  @IsNumber()
  exp: number;

  @IsString()
  jti: string;

  @IsString()
  expires: string;
}
