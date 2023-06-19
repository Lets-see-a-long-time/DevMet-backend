import { ApiField } from 'src/common/decorator/api.decorator';
import { PageRequest } from 'src/common/utils/pagination-request';

export class CommentsRequest extends PageRequest {
  @ApiField({
    type: Number,
    description: '프로젝트 아이디',
    nullable: true,
    example: 1,
  })
  projectId!: number;
}
