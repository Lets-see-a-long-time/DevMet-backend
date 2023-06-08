import { User } from 'src/auth/entity/user.entity';
import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Raw, Repository } from 'typeorm';
import { ProjectsRequest } from '../dto/project/project-request';
import { Like } from '../entity/like.entity';

@CustomRepository(Like)
export class LikeRepository extends Repository<Like> {
  async getMyLikedProejcts(
    request: ProjectsRequest,
    user: User,
  ): Promise<Like[]> {
    const { lastItemId, itemCount } = request;

    return this.find({
      where: {
        userId: user.id,
        id: Raw((alias) => `${alias} > ${lastItemId}`),
      },
      order: {
        id: 'ASC',
      },
      relations: ['project'],
      take: itemCount,
    });
  }
}
