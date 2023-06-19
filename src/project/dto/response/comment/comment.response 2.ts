import { ApiField } from 'src/common/decorator/api.decorator';
import { Comment } from 'src/project/entity/comment.entity';

export default class CommentResponse {
  @ApiField({
    type: Number,
    description: '댓글 아이디',
    nullable: false,
    example: 11,
  })
  id!: number;

  @ApiField({
    type: String,
    description: '댓글 내용',
    nullable: false,
    example: '저 참여하고 싶어요.',
  })
  content!: string;

  @ApiField({
    type: Number,
    description: '작성자 아이디',
    nullable: false,
    example: 11,
  })
  authorUserId!: number;

  @ApiField({
    type: String,
    description: '작성자 닉네임',
    nullable: false,
    example: '인태',
  })
  authorUserName!: string;

  @ApiField({
    type: Number,
    description: '부모 댓글 아이디 (대댓글인 경우)',
    nullable: true,
    example: 11,
  })
  parentId?: number;

  @ApiField({
    type: Number,
    description: '댓글 좋아요 수',
    nullable: false,
    example: 5,
  })
  likeCount!: number;

  @ApiField({
    type: Date,
    description: '댓글 작성일시',
    nullable: false,
    example: new Date(),
  })
  createdAt!: Date;

  static fromComment(comment: Comment): CommentResponse {
    const response = new CommentResponse();
    response.id = comment.id;
    response.content = comment.content;
    (response.authorUserId = comment.userId),
      (response.authorUserName = comment.user?.name);
    response.parentId = comment.parentId;
    response.likeCount = comment.likeCount;
    response.createdAt = comment.createdAt;
    return response;
  }
}
