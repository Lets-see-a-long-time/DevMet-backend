import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { LikeComment } from '../entity/like-comment.entity';

@CustomRepository(LikeComment)
export class LikeCommentRepository extends Repository<LikeComment> {}
