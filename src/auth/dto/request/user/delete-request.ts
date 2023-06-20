import { ApiField } from 'src/common/decorator/api.decorator';
import { StackProps } from '../../../types/userinfo.type';
import { ProjectStack } from 'src/project/entity/project-stack.entity';
export class DeleteUserRequest {
  @ApiField({
    type: String,
    example: '001122',
    description: '유저 아이디',
  })
  id!: string;

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
  stack?: ProjectStack;

  getAuthFields() {
    return {
      role: this.role,
      email: this.nickname,
      nickname: this.nickname,
      image: this.image,
      stack: this.stack,
    };
  }
}
