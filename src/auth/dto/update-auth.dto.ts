import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateAuthDTO {
  @ApiProperty({
    example: '001122',
    description: '유저 아이디',
  })
  @IsString()
  userId!: string;

  @ApiProperty({
    example: '백광현',
    description: '유저 이름',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'bgh9651@gmail.com',
    description: '유저 이메일',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    example: 'https://image.com',
    description: '유저 이미지',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: 'front-end', description: '유저 직무' })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({ example: '인태여친구함', description: '유저 닉네임' })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiProperty({ example: '[리액트, 자바스크립크]', description: '유저 스택' })
  @IsOptional()
  @IsString()
  stack?: string;
}
