import { ApiField } from 'src/common/decorator/api.decorator';
import { ScrollRequest } from 'src/common/utils/scroll-request';

export class ProjectListRequest extends ScrollRequest {
  @ApiField({
    type: String,
    description: '프로젝트 검색어',
    nullable: true,
    example: '팀원',
  })
  keyword?: string;
}
