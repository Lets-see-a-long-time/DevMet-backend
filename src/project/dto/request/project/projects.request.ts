import { SortType } from 'src/common/enum/enum';
import { ApiField } from 'src/common/decorator/api.decorator';
import { PageRequest } from 'src/common/utils/pagination-request';

export class ProjectListRequest extends PageRequest {
  @ApiField({
    type: String,
    description: '프로젝트 검색어',
    nullable: true,
    example: '팀원',
  })
  keyword?: string;

  @ApiField({
    type: SortType,
    description: '정렬 방식  [ DATETIME | LIKECOUNT | COMMENT | VIEWCOUNT ] ',
    nullable: true,
    example: SortType.DATETIME,
  })
  sortBy?: SortType;
}
