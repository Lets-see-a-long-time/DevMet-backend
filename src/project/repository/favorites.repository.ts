import { User } from 'src/auth/entity/user.entity';
import { PageRequest } from 'src/common/utils/pagination-request';
import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { Favorites } from '../entity/favorite.entity';

@CustomRepository(Favorites)
export class FavoritesRepository extends Repository<Favorites> {
  async getMyFavoritesProejcts(
    request: PageRequest,
    user: User,
  ): Promise<Favorites[]> {
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
