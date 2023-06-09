import { ApiEnumField } from './../../../../common/decorator/api.decorator';
import { ApiField } from 'src/common/decorator/api.decorator';
import { Project } from 'src/project/entity/project.entity';
import {
  ProjectPositionType,
  ProjectStackType,
  ProjectStatusType,
  ProjectType,
} from 'src/common/enum/enum';

export default class ProjectResponse {
  @ApiField({
    type: Number,
    description: '유저 아이디',
    nullable: false,
    example: '0000111122223333',
  })
  id!: number;

  @ApiField({
    type: String,
    description: '프로젝트 타이틀',
    nullable: false,
    example: '프로젝트 백엔드 모셔요.',
  })
  title!: string;

  @ApiField({
    type: String,
    description: '프로젝트 내용',
    nullable: false,
    example: '이러이러 하신 백엔드분이 필요해요.',
  })
  content!: string;

  @ApiEnumField({
    type: ProjectType,
    description: '프로젝트 유형',
    nullable: false,
    example: ProjectType.PROJECT,
  })
  type!: ProjectType;

  @ApiEnumField({
    type: ProjectStatusType,
    description: '프로젝트 상태',
    nullable: false,
    example: ProjectStatusType.RECRUITING,
  })
  status!: ProjectStatusType;

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
    type: [String],
    description: '프로젝트 태그들',
    nullable: false,
    example: ['#스터디', '#친목'],
  })
  tags!: string[];

  @ApiField({
    type: [ProjectStackType],
    description: '프로젝트 스택들',
    nullable: true,
    example: [ProjectStackType.DOCKER],
  })
  stacks?: ProjectStackType[];

  @ApiField({
    type: [ProjectPositionType],
    description: '프로젝트 포지션들',
    nullable: false,
    example: [ProjectPositionType.BACKEND],
  })
  positions!: string[];

  @ApiField({
    type: Number,
    description: '프로젝트 모집인원',
    nullable: false,
    example: 5,
  })
  numberOfRecruits!: number;

  @ApiField({
    type: Number,
    description: '프로젝트 좋아요수',
    nullable: false,
    example: 5,
  })
  likeCount!: number;

  @ApiField({
    type: Number,
    description: '프로젝트 조회수',
    nullable: false,
    example: 5,
  })
  viewCount!: number;

  @ApiField({
    type: Number,
    description: '프로젝트 댓글수',
    nullable: false,
    example: 5,
  })
  commentCount!: number;

  @ApiField({
    type: Date,
    description: '프로젝트 작성일시',
    nullable: false,
    example: '2023-06-10',
  })
  createdAt!: Date;

  static fromProject(project: Project): ProjectResponse {
    const response = new ProjectResponse();
    response.id = project.id;
    response.title = project.title;
    response.content = project.content;
    response.type = project.type;
    response.status = project.status;
    (response.authorUserId = project.userId),
      (response.authorUserName = project.user?.name);
    response.tags = project.tags.map((tag) => tag.tag);
    response.stacks = project.projectStacks.map((stack) => stack.stack?.type);
    response.positions = project.projectPositions.map(
      (position) => position.positionType,
    );
    response.numberOfRecruits = project.numberOfRecruits;
    response.likeCount = project.likeCount;
    response.viewCount = project.viewCount;
    response.commentCount = project.commentCount;
    response.createdAt = project.createdAt;
    return response;
  }
}
