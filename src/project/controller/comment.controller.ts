import { Body, Controller, Param, Query } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { CreateCommentDto } from '../dto/comment/create-comment.dto';
import { UpdateCommentDto } from '../dto/comment/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteApi,
  GetApi,
  PatchApi,
  PostApi,
} from 'src/common/decorator/api.decorator';
import { Comment } from '../entity/comment.entity';
import { CommentsRequest } from '../dto/comment/comments-request';
import { GetUser } from 'src/common/decorator/get-user.dacorator';
import SuccessResponse from 'src/common/utils/success.response';
import { User } from 'src/auth/entity/user.entity';

@ApiTags('Project Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @GetApi(() => [Comment], {
    path: '/',
    description: '댓글 목록 조회 ',
    auth: false,
  })
  getComments(@Query() request: CommentsRequest): Promise<Comment[]> {
    return this.commentService.getComments(request);
  }

  @GetApi(() => Comment, {
    path: '/:id',
    description: '댓글 조회 ',
    auth: false,
  })
  getComment(@Param('id') id: number): Promise<Comment> {
    return this.commentService.getComment(+id);
  }

  @PostApi(() => Comment, {
    path: '/',
    description: '댓글 생성( Required: AccessToken )',
    auth: true,
  })
  createComment(
    @Body() request: CreateCommentDto,
    @GetUser() user: User,
  ): Promise<Comment> {
    return this.commentService.createComment(request, user);
  }

  @PatchApi(() => SuccessResponse, {
    path: '/',
    description: '댓글 수정( Required: AccessToken )',
    auth: true,
  })
  updateComment(
    @Body() request: UpdateCommentDto,
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
