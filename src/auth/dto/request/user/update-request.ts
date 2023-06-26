import { ApiField } from 'src/common/decorator/api.decorator';
import { ProjectStackType } from 'src/common/enum/enum';
export class UpdateUserRequest {
  @ApiField({
    type: String,
    example: '001122',
    description: '유저 아이디',
  })
  userId!: string;

  @ApiField({
    type: String,
    example: '백광현',
    description: '유저 이름',
  })
  name?: string;

  @ApiField({
    type: String,
    example: 'bgh9651@gmail.com',
    description: '유저 이메일',
  })
  email?: string;

  @ApiField({
    type: String,
    example: 'https://image.com',
    description: '유저 이미지',
  })
  image?: string;

  @ApiField({
    type: String,
    example: 'front-end',
    description: '유저 직무',
  })
  role?: string;

  @ApiField({
    type: String,
    example: '인태여친구함',
    description: '유저 닉네임',
  })
  nickname?: string;

  @ApiField({
    type: [String],
    example: '[리액트, 자바스크립크]',
    description: '유저 스택',
  })
  stack?: ProjectStackType;

  getAuthFields() {
    return {
      userId: this.userId,
      role: this.role,
      stack: this.stack,
      nickname: this.nickname,
    };
  }
}
