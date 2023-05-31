import { ApiField } from 'src/common/decorator/api.decorator';

export class UpdateCommentDto {
  @ApiField({
    type: Number,
    description: '댓글 아이디',
    nullable: true,
    example: 1,
  })
  id!: number;

  @ApiField({
    type: String,
    description: '변경할 댓글 내용',
    nullable: false,
    example: '백엔드 인원 구합니다.',
  })
  comment!: string;
}
