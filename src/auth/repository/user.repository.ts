import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entity/user.entity';
import { UserDTO } from '../dto/user.dto';
import { NotFoundException } from '@nestjs/common';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async updateUser(userDTO: UserDTO) {
    const { userId, email, image, name, nickname, role, stack } = userDTO;
    const user = await this.update(userId, {
      userId,
      email,
      image,
      name,
      nickname,
      role,
      stack,
    });

    if (user.affected === 0) {
      throw new NotFoundException(`${userId} 이 글은 수정 할 수 없습니다.`);
    }
    return 'success';
  }
}
