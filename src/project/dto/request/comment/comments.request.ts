import { ApiField } from 'src/common/decorator/api.decorator';

export class CommentsRequest {
  @ApiField({
    type: Number,
    description: '프로젝트 아이디',
    nullable: true,
    example: 1,
  })
  projectId!: number;

  @ApiField({
    type: Number,
    description: '마지막 아이템 아이디',
    nullable: true,
    example: 1,
  })
  lastItemId?: number;

  @ApiField({
    type: Number,
    description: '페이지당 아이템 갯수',
    nullable: true,
    example: 10,
  })
  itemCount?: number;
}
