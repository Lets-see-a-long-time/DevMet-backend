import { IsNumber } from 'class-validator';
import { ApiField } from 'src/common/decorator/api.decorator';

export class PageRequest {
  @IsNumber()
  @ApiField({
    type: Number,
    description: '페이지',
    nullable: false,
    example: 1,
  })
  page!: number;

  @IsNumber()
  @ApiField({
    type: Number,
    description: '페이지당 아이템 갯수',
    nullable: false,
    example: 10,
  })
  itemCount!: number;
}
