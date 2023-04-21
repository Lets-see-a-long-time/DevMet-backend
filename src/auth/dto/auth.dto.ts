import { IsOptional, IsString } from 'class-validator';

export class AuthDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsString()
  expires: string;
}
