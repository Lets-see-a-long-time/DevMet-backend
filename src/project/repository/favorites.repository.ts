import { User } from 'src/auth/entity/user.entity';
import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Raw, Repository } from 'typeorm';
import { ProjectsRequest } from '../dto/project/project-request';
import { Favorites } from '../entity/favorite.entity';

@CustomRepository(Favorites)
export class FavoritesRepository extends Repository<Favorites> {
  async getMyFavoritesProejcts(
    request: ProjectsRequest,
    user: User,
  ): Promise<Favorites[]> {
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
