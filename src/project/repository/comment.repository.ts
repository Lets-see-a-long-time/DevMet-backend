import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { Comment } from '../entity/comment.entity';
import { CreateCommentDto } from '../dto/comment/create-comment.dto';
import { User } from 'src/auth/entity/user.entity';

@CustomRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(request: CreateCommentDto, user: User): Promise<Comment> {
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
