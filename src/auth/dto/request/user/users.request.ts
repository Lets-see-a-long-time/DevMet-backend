import { ApiField } from 'src/common/decorator/api.decorator';
import { ScrollRequest } from 'src/common/utils/scroll-request';

export class UserListRequest extends ScrollRequest {
  @ApiField({
    type: String,
    description: '유저 검색',
    nullable: true,
    example: '백광현',
  })
  keyword?: string;
}
