import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCreateDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '영어랑 한글만 가능해',
  })
  password: string;
}
