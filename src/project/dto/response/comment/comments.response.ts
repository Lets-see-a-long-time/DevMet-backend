import { ApiField, ApiNestedField } from 'src/common/decorator/api.decorator';
import CommentResponse from './comment.response';
import { Comment } from 'src/project/entity/comment.entity';

export default class CommentsResponse {
  @ApiNestedField({
    type: [CommentResponse],
    description: '댓글 목록',
    nullable: false,
  })
  comments!: CommentResponse[];

  @ApiField({
    type: Number,
    description: '총 프로젝트 수',
    nullable: false,
    example: 12,
  })
  countOfTotal!: number;

  static fromComments(
    comments: Comment[],
    countOfTotal: number,
  ): CommentsResponse {
    const response = new CommentsResponse();
    response.comments = comments.map((comment) =>
      CommentResponse.fromComment(comment),
    );
    response.countOfTotal = countOfTotal;
    return response;
  }
}
