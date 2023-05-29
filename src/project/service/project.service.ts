import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '../entity/project.entity';
import { CreateProjectDto } from '../dto/project/create-project.dto';
import { UpdateProjectDto } from '../dto/project/update-project.dto';
import SuccessResponse from 'src/common/utils/success.response';
import { ProjectRepository } from '../repository/project.repository';
import { User } from 'src/auth/entity/user.entity';
import { UserService } from 'src/auth/service/user.service';
import { ProjectsRequest } from '../dto/project/projects-request';

@Injectable()
export class ProjectService {
  constructor(
    private projectRepository: ProjectRepository,
    private authService: UserService,
  ) {}

  async getAllProjects(projectRequest: ProjectsRequest): Promise<Project[]> {
    const { page, itemCount } = projectRequest;

    const skip = (page - 1) * itemCount;
    const take = itemCount;

    return this.projectRepository.find({ skip, take });
  }

  async getProjectById(id: number) {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) {
      throw new NotFoundException(`이 글은 없는 글입니다.`);
    }
    return project;
  }

  async createProject(
    createProjectDto: CreateProjectDto,
    user: User,
  ): Promise<Project> {
    return this.projectRepository.createProejct(createProjectDto, user);
  }

  async deleteProject(id: number, user: User) {
    const project = await this.getProjectById(id);

    if (project.userId != user.id) {
      throw new NotFoundException(`작성자만 글 삭제가 가능합니다.`);
    }

    const deleted = await this.projectRepository.delete({ id });

    if (deleted.affected === 0) {
      throw new NotFoundException(`${id} 이 글은 지울수 없습니다.`);
    }

    return SuccessResponse.fromSuccess(true);
  }
  async updateProject(request: UpdateProjectDto, user: User) {
    const project = await this.projectRepository.findOneBy({ id: request.id });

    if (project.userId !== user.id) {
      throw new NotFoundException(`작성자만 수정이 가능합니다`);
    }

    const updated = await this.projectRepository.update(
      request.id,
      request.getProjectFields(),
    );

    if (updated.affected === 0) {
      throw new NotFoundException(`이 글은 수정 할 수 없습니다.`);
    }

    return SuccessResponse.fromSuccess(true);
  }

  async handleLikeCount(id: number, user: User): Promise<SuccessResponse> {
    const project = await this.projectRepository.findOneBy({ id });

    if (project.likeUserIds.includes(user.userId)) {
      const updatedLikeUserIds = project.likeUserIds.filter(
        (userId) => userId !== user.userId,
      );
      project.likeUserIds = updatedLikeUserIds;
      project.likeCount -= 1;
      await this.projectRepository.save(project);
    } else {
      project.likeUserIds.push(user.userId);
      project.likeCount += 1;
      await this.projectRepository.save(project);
    }

    return SuccessResponse.fromSuccess(true);
  }
}
