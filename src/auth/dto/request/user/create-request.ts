import { ApiField } from 'src/common/decorator/api.decorator';
import { ProviderProps } from '../../../types/userinfo.type';
export class CreateUserRequest {
  @ApiField({
    type: String,
    example: '011',
    description: '아이디',
  })
  id: string;

  @ApiField({
    type: String,
    example: '백광현',
    description: '유저 이름',
  })
  name: string;

  @ApiField({
    type: String,
    example: 'bgh9651@gmail.com',
    description: '유저 이메일',
  })
  email: string;

  @ApiField({
    type: String,
    example: 'https://image.com',
    description: '유저 이미지',
  })
  image: string;

  @ApiField({
    type: [String],
    example: 'kakao',
    description: '유저 소셜로그인 타입',
  })
  provider: ProviderProps;
}
