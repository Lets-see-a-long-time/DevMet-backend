import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @IsString()
  @ApiProperty({
    example: '팀원 구함',
    description: '프로젝트 제목',
  })
  title: string;

  @IsString()
  @ApiProperty({
    example: '자바 두명 타세요',
    description: '프로젝트 내용',
  })
  content: string;

  // @IsArray()
  @ApiProperty({
    example: "['react']",
    description: '프로젝트 태그',
  })
  tag?: string[];
}
