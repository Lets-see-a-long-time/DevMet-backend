import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { Comment } from '../entity/comment.entity';

@CustomRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  // async getLikeByProject(id: number): Promise<Like> {
  //   const
  // }
}
