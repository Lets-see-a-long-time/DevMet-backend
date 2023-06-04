import { ApiField } from 'src/common/decorator/api.decorator';
import { ProjectPositionType } from 'src/common/enum/enum';

export class CreateProjectDto {
  @ApiField({
    type: String,
    description: '프로젝트 아이디',
    nullable: false,
    example: '프로젝트 임원 구해요.',
  })
  title!: string;

  @ApiField({
    type: String,
    description: '프로젝트 내용',
    nullable: false,
    example: '5월 부터 시작하는 프로젝트 프론트 구합니다.',
  })
  content!: string;

  @ApiField({
    type: [String],
    description: '프로젝트 관련 스택 목록',
    nullable: true,
    example: '[react, java]',
  })
  tag?: string[];

  @ApiField({
    type: [ProjectPositionType],
    description: '프로젝트 구인 포지션',
    nullable: true,
    example: [ProjectPositionType.BACKEND],
  })
  position?: ProjectPositionType[];
}
