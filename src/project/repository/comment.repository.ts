import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { Comment } from '../entity/comment.entity';
import { User } from 'src/auth/entity/user.entity';
import { CreateCommentRequest } from '../dto/request/comment/create-comment.request';

@CustomRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(
    request: CreateCommentRequest,
    user: User,
  ): Promise<Comment> {
    const comment = await this.create({
      content: request.content,
      projectId: request.projectId,
      userId: user.id,
      parentId: request.parentId,
    });

    await this.save(comment);

    console.log('comment', comment);
    return comment;
  }
}
