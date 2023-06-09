import { ApiField } from 'src/common/decorator/api.decorator';

export class UpdateProjectRequest {
  @ApiField({
    type: Number,
    description: '프로젝트 아이디',
    nullable: false,
    example: 2,
  })
  id!: number;

  @ApiField({
    type: String,
    description: '프로젝트 제목',
    nullable: true,
    example: '프로젝트 임원 구해요.',
  })
  title?: string;

  @ApiField({
    type: String,
    description: '프로젝트 내용',
    nullable: true,
    example: '5월 부터 시작하는 프로젝트 프론트 구합니다.',
  })
  content?: string;

  @ApiField({
    type: [String],
    description: '프로젝트 관련 스택 목록',
    nullable: true,
    example: '[react, java]',
  })
  tag?: string[];

  getProjectFields() {
    return {
      content: this.content,
      title: this.title,
      tag: this.tag,
    };
  }
}
