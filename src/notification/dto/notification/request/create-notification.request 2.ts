import { ApiField } from 'src/common/decorator/api.decorator';
import { NotificationType } from 'src/common/enum/enum';

export class CreateNotificationRequest {
  @ApiField({
    type: String,
    description: '알람 메시지',
    nullable: false,
    example: '게시글에 댓글이 작성되었습니다.',
  })
  message!: string;

  @ApiField({
    type: Number,
    description: '알람 대상 아이디',
    nullable: false,
    example: 55,
  })
  targetUserId!: number;

  @ApiField({
    type: NotificationType,
    description: '알람 유형',
    nullable: false,
    example: NotificationType.COMMENT,
  })
  type!: NotificationType;
}
