import { IsNumberString } from 'class-validator';
import { ApiField } from 'src/common/decorator/api.decorator';

export class ProjectsRequest {
  // @ApiField({
  //   type: String,
  //   description: '프로젝트 아이디',
  //   nullable: true,
  //   example: '프로젝트 임원 구해요.',
  // })
  // title?: string;

  @IsNumberString()
  @ApiField({
    type: Number,
    description: '페이지',
    nullable: true,
    example: 1,
  })
  page!: number;

  @IsNumberString()
  @ApiField({
    type: Number,
    description: '페이지당 아이템 갯수',
    nullable: true,
    example: 10,
  })
  itemCount!: number;
}
