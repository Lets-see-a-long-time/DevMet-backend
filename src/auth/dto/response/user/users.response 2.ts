import { ApiField, ApiNestedField } from 'src/common/decorator/api.decorator';
import { User } from 'src/auth/entity/user.entity';
import UserResponse from './user.reponse';

export class UsersResponse {
  @ApiNestedField({
    type: [UserResponse],
    description: '유저 목록',
    nullable: false,
  })
  users!: UserResponse[];

  @ApiField({
    type: Number,
    description: '총 유저 수',
    nullable: false,
    example: 12,
  })
  countOfTotal!: number;

  static fromUsers(users: User[], countOfTotal: number): UsersResponse {
    const response = new UsersResponse();
    response.users = users.map((user) => UserResponse.fromUser(user));
    response.countOfTotal = countOfTotal;
    return response;
  }
}
