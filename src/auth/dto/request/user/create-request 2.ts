import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProviderProps } from '../../../types/userinfo.type';
export class CreateUserRequest {
  @ApiProperty({
    example: '011',
    description: '아이디',
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: '백광현',
    description: '유저 이름',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'bgh9651@gmail.com',
    description: '유저 이메일',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'https://image.com',
    description: '유저 이미지',
  })
  @IsString()
  image: string;

  @ApiProperty({
    example: 'kakao',
    description: '유저 소셜로그인 타입',
  })
  @IsString()
  provider: ProviderProps;
}
