import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { Like } from '../entity/like.entity';

@CustomRepository(Like)
export class LikeRepository extends Repository<Like> {}
