import { ApiField } from 'src/common/decorator/api.decorator';

export class CreateCommentRequest {
  @ApiField({
    type: Number,
    description: '프로젝트 아이디',
    nullable: false,
    example: 2,
  })
  projectId!: number;

  @ApiField({
    type: String,
    description: '프로젝트 내용',
    nullable: false,
    example: '5월 부터 시작하는 프로젝트 프론트 구합니다.',
  })
  content!: string;

  @ApiField({
    type: Number,
    description: '대댓글 일시 댓글 아이디',
    nullable: true,
    example: 2,
  })
  parentId?: number;
}
