import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { Like } from '../entity/like.entity';

@CustomRepository(Like)
export class LikeRepository extends Repository<Like> {
  // async handleLikeCount(id: string, user: User): Promise<Like> {
  //   const like = this.create({
  //     projectId: id,
  //     userId: user.id,
  //   });
  //   await this.save(like);
  //   return like;
  // }
  // async getLikeByProject(id: number): Promise<Like> {
  //   const
  // }
}
