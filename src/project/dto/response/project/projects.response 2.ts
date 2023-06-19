import { ApiField, ApiNestedField } from 'src/common/decorator/api.decorator';
import { Project } from 'src/project/entity/project.entity';
import ProjectResponse from './project.response';

export default class ProjectsResponse {
  @ApiNestedField({
    type: [ProjectResponse],
    description: '프로젝트 목록',
    nullable: false,
  })
  projects!: ProjectResponse[];

  @ApiField({
    type: Number,
    description: '총 프로젝트 수',
    nullable: false,
    example: 12,
  })
  countOfTotal!: number;

  static fromProjects(
    projects: Project[],
    countOfTotal: number,
  ): ProjectsResponse {
    const response = new ProjectsResponse();
    response.projects = projects.map((project) =>
      ProjectResponse.fromProject(project),
    );
    response.countOfTotal = countOfTotal;
    return response;
  }
}
