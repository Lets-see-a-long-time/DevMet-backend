import { Body, Controller, Param, Query } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteApi,
  GetApi,
  PatchApi,
  PostApi,
} from 'src/common/decorator/api.decorator';
import { Comment } from '../entity/comment.entity';
import { CommentsRequest } from '../dto/request/comment/comments.request';
import SuccessResponse from 'src/common/utils/success.response';
import { User } from 'src/auth/entity/user.entity';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { CreateCommentRequest } from '../dto/request/comment/create-comment.request';
import { UpdateCommentRequest } from '../dto/request/comment/update-comment.request';
import CommentsResponse from '../dto/response/comment/comments.response';
import CommentResponse from '../dto/response/comment/comment.response';

@ApiTags('Project Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @GetApi(() => [CommentsResponse], {
    path: '/',
    description: '댓글 목록 조회 (Optional: AccessToken)',
    auth: false,
  })
  getComments(@Query() request: CommentsRequest): Promise<CommentsResponse> {
    return this.commentService.getComments(request);
  }

  @GetApi(() => CommentResponse, {
    path: '/:id',
    description: '댓글 조회 (Optional: AccessToken)',
    auth: false,
  })
  getComment(@Param('id') id: number): Promise<CommentResponse> {
    return this.commentService.getComment(id);
  }

  @PostApi(() => CommentResponse, {
    path: '/',
    description: '댓글 생성( Required: AccessToken )',
    auth: true,
  })
  createComment(
    @Body() request: CreateCommentRequest,
    @GetUser() user: User,
  ): Promise<CommentResponse> {
    return this.commentService.createComment(request, user);
  }

  @PatchApi(() => SuccessResponse, {
    path: '/',
    description: '댓글 수정( Required: AccessToken )',
    auth: true,
  })
  updateComment(
    @Body() request: UpdateCommentRequest,
    @GetUser() user: User,
  ): Promise<SuccessResponse> {
    return this.commentService.updateComment(request, user);
  }

  @PatchApi(() => SuccessResponse, {
    path: '/:id/like',
    description: '댓글 좋아요( Required: AccessToken )',
    auth: true,
  })
  handleLikeComment(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<SuccessResponse> {
    return this.commentService.handleLikeComment(id, user);
  }

  @DeleteApi(() => SuccessResponse, {
    path: '/:id',
    description: '댓글 삭제 ( Required: AccessToken )',
    auth: true,
  })
  deleteComment(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<SuccessResponse> {
    return this.commentService.deleteComment(id, user);
  }
}
