import { CustomRepository } from 'src/configs/typeorm.decorator';
import { User } from 'src/auth/entity/user.entity';
import { UserDTO } from '../dto/response/user/users.response';
import { NotFoundException } from '@nestjs/common';
import { UserListRequest } from '../dto/request/user/users.request';
import { Brackets, Raw, Repository } from 'typeorm';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async getAllUsers(userRequest: UserListRequest): Promise<User[]> {
    const { lastItemId, itemCount, keyword } = userRequest;
    const where: any[] = [];

    if (keyword) {
      where.push(
        { title: Raw((alias) => `${alias} LIKE '%${keyword}%'`) },
        { content: Raw((alias) => `${alias} LIKE '%${keyword}%'`) },
      );
    }

    const queryBuilder = this.createQueryBuilder('user')
      .where('user.id > :lastItemId', { lastItemId })
      .orderBy('user.id')
      .take(itemCount);

    if (where.length > 0) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          where.forEach((condition) => {
            qb.orWhere(condition);
          });
        }),
      );
    }

    const users = await queryBuilder.getMany();

    return users;
  }

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
