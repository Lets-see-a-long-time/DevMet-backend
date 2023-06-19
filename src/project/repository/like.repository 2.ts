import { User } from 'src/auth/entity/user.entity';
import { PageRequest } from 'src/common/utils/pagination-request';
import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { Like } from '../entity/like.entity';

@CustomRepository(Like)
export class LikeRepository extends Repository<Like> {
  async getMyLikedProejcts(request: PageRequest, user: User): Promise<Like[]> {
    const { page, itemCount } = request;
    const skip = (page - 1) * itemCount;
    const take = itemCount;

    return this.find({
      where: {
        userId: user.id,
      },
      order: {
        id: 'ASC',
      },
      relations: ['project'],
      skip,
      take,
    });
  }
}
