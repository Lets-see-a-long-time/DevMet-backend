import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Brackets, Repository } from 'typeorm';
import { Comment } from '../entity/comment.entity';
import { User } from 'src/auth/entity/user.entity';
import { CreateCommentRequest } from '../dto/request/comment/create-comment.request';
import { CommentsRequest } from '../dto/request/comment/comments.request';

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

    return comment;
  }

  async getComments(request: CommentsRequest): Promise<Comment[]> {
    const { page, itemCount, projectId } = request;
    const skip = (page - 1) * itemCount;
    const take = itemCount;

    const where: any[] = [];

    const queryBuilder = this.createQueryBuilder('comment')
      .where('comment.projectId = :projectId', { projectId })
      .orderBy('comment.id')
      .skip(skip)
      .take(take)
      .leftJoinAndSelect('comment.user', 'user');

    if (where.length > 0) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          where.forEach((condition) => {
            qb.orWhere(condition);
          });
        }),
      );
    }

    const comments = await queryBuilder.getMany();

    return comments;
  }

  async countComments(request: CommentsRequest): Promise<number> {
    const count = await this.createQueryBuilder('comment')
      .where('comment.projectId = :projectId', { projectId: request.projectId }) // projectId 필터링 추가
      .getCount();

    return count;
  }
}
