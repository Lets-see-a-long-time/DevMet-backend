import { Project } from 'src/project/entity/project.entity';
import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';
import { ApiField, ApiNestedField } from 'src/common/decorator/api.decorator';
import { ProviderProps, StackProps } from '../../../types/userinfo.type';
import { User } from 'src/auth/entity/user.entity';
import UserResponse from './user.reponse';

export class UsersResponse {
  @ApiNestedField({
    type: [UsersResponse],
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
    response.users = users.map((user) =>
      UsersResponse.fromUsers(user, countOfTotal),
    );
    response.countOfTotal = countOfTotal;
    return response;
  }
}
