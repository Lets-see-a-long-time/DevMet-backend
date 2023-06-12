import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/entity/user.entity';
import { CommentRepository } from '../repository/comment.repository';
import { CommentsRequest } from '../dto/request/comment/comments.request';
import { ProjectService } from './project.service';
import SuccessResponse from 'src/common/utils/success.response';
import { LikeCommentRepository } from '../repository/like-comment.repository';
import { UpdateCommentRequest } from '../dto/request/comment/update-comment.request';
import { CreateCommentRequest } from '../dto/request/comment/create-comment.request';
import CommentsResponse from '../dto/response/comment/comments.response';
import CommentResponse from '../dto/response/comment/comment.response';
import { NotificationService } from 'src/notification/service/notification.service';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private projectService: ProjectService,
    private likeCommentRepository: LikeCommentRepository,
    private notificationService: NotificationService,
  ) {}

  async getComments(request: CommentsRequest): Promise<CommentsResponse> {
    const comments = await this.commentRepository.getComments(request);

    const countOfTotal = await this.commentRepository.countComments(request);

    return CommentsResponse.fromComments(comments, countOfTotal);
  }

  async getComment(id: number): Promise<CommentResponse> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    return CommentResponse.fromComment(comment);
  }

  async createComment(
    request: CreateCommentRequest,
    user: User,
  ): Promise<CommentResponse> {
    const project = await this.projectService.getProjectById(request.projectId);

    if (!project) {
      throw new NotFoundException(` 이 글은 없는 글입니다.`);
    }

    const comment = await this.commentRepository.createComment(request, user);

    // 알림 보내기
    // const message = '게시글에 댓글이 작성되었습니다.';
    // this.notificationService.handleConnection(
    //   project.userId.toString(),
    //   message,
    // );

    // const comment = {
    //   userId: '12345',
    //   content: 'This is a new comment!',
    // };
    await this.notificationService.sendNotificationToClient(
      project.user.userId,
      '새로운 댓글이 작성되었습니다.',
    );

    await this.projectService.handleCommentCount(request.projectId, true);

    return CommentResponse.fromComment(comment);
  }

  async updateComment(
    request: UpdateCommentRequest,
    user: User,
  ): Promise<SuccessResponse> {
    const comment = await this.commentRepository.findOne({
      where: { id: request.id },
    });

    if (comment.userId !== user.id) {
      throw new NotFoundException(`작성자만 수정이 가능합니다`);
    }

    const updated = await this.commentRepository.update(
      { id: request.id },
      { content: request.comment },
    );

    if (updated.affected === 0) {
      throw new NotFoundException(` 이 글은 수정 할 수 없습니다.`);
    }

    return SuccessResponse.fromSuccess(true);
  }

  async handleLikeComment(id: number, user: User): Promise<SuccessResponse> {
    const comment = await this.commentRepository.findOneBy({ id });

    if (!comment) {
      throw new NotFoundException(`댓글을 찾을수 없습니다.`);
    }

    const isLike = await this.likeCommentRepository.findOneBy({
      commentId: id,
      userId: user.id,
    });

    if (isLike) {
      await this.likeCommentRepository.delete({
        commentId: id,
        userId: user.id,
      });
    } else {
      const create = await this.likeCommentRepository.create({
        commentId: id,
        userId: user.id,
      });
      await this.likeCommentRepository.save(create);
    }

    const countOfLike = await this.likeCommentRepository.count({
      where: {
        commentId: id,
      },
    });

    comment.likeCount = countOfLike;

    await this.commentRepository.save(comment);

    return SuccessResponse.fromSuccess(true);
  }

  async deleteComment(id: number, user: User): Promise<SuccessResponse> {
    const comment = await this.commentRepository.findOne({ where: { id } });

    if (comment.userId !== user.id) {
      throw new NotFoundException(`작성자만 삭제가 가능합니다`);
    }

    await this.projectService.handleCommentCount(comment.projectId, false);

    const deleted = await this.commentRepository.delete({ id });

    if (deleted.affected === 0) {
      throw new NotFoundException(`이 댓글은 지울수 없습니다.`);
    }

    return SuccessResponse.fromSuccess(true);
  }
}
