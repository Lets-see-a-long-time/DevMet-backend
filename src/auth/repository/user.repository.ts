import { CustomRepository } from 'src/configs/typeorm.decorator';
import { User } from 'src/auth/entity/user.entity';
import { NotFoundException } from '@nestjs/common';
import { Brackets, Raw, Repository } from 'typeorm';
import { UserListRequest } from './../dto/request/user/users.request';
import { UpdateUserRequest } from './../dto/request/user/update-request';
import SuccessResponse from 'src/common/utils/success.response';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async getAllUsers(userRequest: UserListRequest): Promise<User[]> {
    const { page, itemCount, keyword } = userRequest;
    console.log(page, itemCount, keyword);

    const where: any[] = [];

    if (keyword) {
      where.push(
        { title: Raw((alias) => `${alias} LIKE '%${keyword}%'`) },
        { content: Raw((alias) => `${alias} LIKE '%${keyword}%'`) },
      );
    }

    const queryBuilder = this.createQueryBuilder('user').orderBy('user.id');

    if (where.length > 0) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          where.forEach((condition) => {
            qb.orWhere(condition);
          });
        }),
      );
    }

    const skip = (page - 1) * itemCount;
    const take = itemCount;

    const users = await queryBuilder.skip(skip).take(take).getMany();

    return users;
  }

  async countUser(userRequest: UserListRequest): Promise<number> {
    const { keyword } = userRequest;
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
      .leftJoin('user.projects', 'projects'); // Projects 엔티티 조인

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

  async updateUser(request: UpdateUserRequest): Promise<SuccessResponse> {
    const { userId, email, image, name, nickname, role, stack } = request;
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

    return { success: true };
  }
}
