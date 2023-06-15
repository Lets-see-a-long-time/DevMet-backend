import { ApiField } from 'src/common/decorator/api.decorator';
import { PageRequest } from 'src/common/utils/pagination-request';

export class UserListRequest extends PageRequest {
  @ApiField({
    type: String,
    description: '유저 검색',
    nullable: true,
    example: '백광현',
  })
  keyword?: string;
}
