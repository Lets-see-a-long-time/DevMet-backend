import { CustomRepository } from 'src/configs/typeorm.decorator';
import { User } from 'src/auth/entity/user.entity';
import { NotFoundException } from '@nestjs/common';
import { Brackets, Raw, Repository } from 'typeorm';
import { UserListRequest } from './../dto/request/user/users.request';
import { UpdateUserRequest } from './../dto/request/user/update-request';

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

  async countUser(userRequest: UserListRequest): Promise<number> {
    const { lastItemId, keyword } = userRequest;
    const where: any[] = [];

    if (keyword) {
      where.push(
        { title: Raw((alias) => `${alias} LIKE '%${keyword}%'`) },
        { content: Raw((alias) => `${alias} LIKE '%${keyword}%'`) },
      );
    }

    const queryBuilder = this.createQueryBuilder('user')
      .leftJoin('user.like', 'like') // Like 엔티티 조인
      .leftJoin('user.favorite', 'favorite') // Favorite 엔티티 조인
      .leftJoin('user.projects', 'projects') // Projects 엔티티 조인
      .where('user.id > :lastItemId', { lastItemId });

    if (where.length > 0) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          where.forEach((condition) => {
            qb.orWhere(condition);
          });
        }),
      );
    }

    const totalCount = await queryBuilder.getCount();

    return totalCount;
  }

  async updateUser(request: UpdateUserRequest) {
    const { userId, email, image, name, nickname, role, stacks } = request;
    const user = await this.update(userId, {
      userId,
      email,
      image,
      name,
      nickname,
      role,
      stacks,
    });

    if (user.affected === 0) {
      throw new NotFoundException(`${userId} 이 글은 수정 할 수 없습니다.`);
    }

    return { success: true };
  }
}
