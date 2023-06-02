import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { Favorites } from '../entity/favorite.entity';

@CustomRepository(Favorites)
export class FavoritesRepository extends Repository<Favorites> {}
