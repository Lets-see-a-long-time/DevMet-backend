import { ApiField } from 'src/common/decorator/api.decorator';
import { ProjectsRequest } from './project-request';

export class ProjectListRequest extends ProjectsRequest {
  @ApiField({
    type: String,
    description: '프로젝트 검색어',
    nullable: true,
    example: '팀원',
  })
  keyword?: string;
}
