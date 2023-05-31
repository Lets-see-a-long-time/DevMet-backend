import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from 'src/auth/entity/user.entity';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async getAllUser() {
    return this.userRepository.find({});
  }

  async getOneUser(id: number) {
    return this.userRepository.findOneBy({ id });
  }
  async updateUser(id: number, userDTO: UserDTO) {
    const user = await this.userRepository.update(id, userDTO);

    if (user.affected === 0) {
      throw new NotFoundException(`${id} 이 유저는 지울 수 없습니다.`);
    }
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.delete(id);

    if (user.affected === 0) {
      throw new NotFoundException(`${id} 이 글은 지울수 없습니다.`);
    }
  }
}
