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
    description: '프로젝트 관련 태그 목록',
    nullable: true,
    example: ['react', '스터디'],
  })
  tags?: string[];

  @ApiField({
    type: [Number],
    description: '프로젝트 관련 스택 목록',
    nullable: true,
    example: [1, 2],
  })
  stacks?: number[];

  @ApiField({
    type: Number,
    description: '프로젝트 모집 인원',
    nullable: false,
    example: 5,
  })
  numberOfRecruits: number;

  @ApiField({
    type: Date,
    description: '프로젝트 모집 마감 기한',
    nullable: false,
    example: '2023-06-23',
  })
  recuitmentDeadLine: Date;

  @ApiField({
    type: [ProjectPositionType],
    description: '프로젝트 구인 포지션',
    nullable: true,
    example: [ProjectPositionType.BACKEND],
  })
  position?: ProjectPositionType[];
}
