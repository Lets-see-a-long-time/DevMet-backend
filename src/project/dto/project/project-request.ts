import { IsNumberString } from 'class-validator';
import { ApiField } from 'src/common/decorator/api.decorator';

export class ProjectsRequest {
  @IsNumberString()
  @ApiField({
    type: Number,
    description: '프로젝트 마지막 아이디',
    nullable: true,
    example: 1,
  })
  lastItemId!: number;

  @IsNumberString()
  @ApiField({
    type: Number,
    description: '페이지당 아이템 갯수',
    nullable: true,
    example: 10,
  })
  itemCount!: number;
}
