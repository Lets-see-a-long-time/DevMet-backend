import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UsersResponse } from '../dto/response/user/users.response';
import { UserListRequest } from '../dto/request/user/users.request';
import { UpdateUserRequest } from './../dto/request/user/update-request';
import SuccessResponse from 'src/common/utils/success.response';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUser(request: UserListRequest): Promise<UsersResponse> {
    const users = await this.userRepository.getAllUsers(request);
    const countOfTotal = await this.userRepository.countUser(request);

    return UsersResponse.fromUsers(users, countOfTotal);
  }

  async getUserbyId(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async updateUser(
    id: number,
    request: UpdateUserRequest,
  ): Promise<SuccessResponse> {
    const updated = await this.userRepository.update(
      id,
      request.getAuthFields(),
    );

    if (updated.affected === 0) {
      throw new NotFoundException(`${id} 이 유저는 수정할 수 없습니다.`);
    }

    return SuccessResponse.fromSuccess(true);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.delete(id);

    if (user.affected === 0) {
      throw new NotFoundException(`${id} 이 유저는 지울 수 없습니다.`);
    }

    return SuccessResponse.fromSuccess(true);
  }
}
