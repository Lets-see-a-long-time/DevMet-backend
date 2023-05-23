import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '../entity/project.entity';
import { CreateProjectDto } from '../dto/project/create-project.dto';
import { UpdateProjectDto } from '../dto/project/update-project.dto';
import SuccessResponse from 'src/common/utils/success.response';
import { ProjectRepository } from '../repository/project.repository';
import { Auth } from 'src/auth/entity/auth.entity';
import { AuthService } from 'src/auth/service/auth.service';

@Injectable()
export class ProjectService {
  constructor(
    private projectRepository: ProjectRepository,
    private authService: AuthService,
  ) {}

  async getAllProjects() {
    return this.projectRepository.find({});
  }

  async getProjectById(id: number) {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) {
      throw new NotFoundException(`${id} 이 글은 없는 글입니다.`);
    }
    return project;
  }

  async createProject(
    createProjectDto: CreateProjectDto,
    user: Auth,
  ): Promise<Project> {
    await this.authService.checkExistingUser(user);

    return this.projectRepository.createProejct(createProjectDto, user);
  }

  async deleteProject(id: number, user: Auth) {
    await this.authService.checkExistingUser(user);

    const test = await this.getProjectById(id);

    if (test.userId != user.id) {
      throw new NotFoundException(`작성자만 글 삭제가 가능합니다.`);
    }

    const project = await this.projectRepository.delete({ id });

    if (project.affected === 0) {
      throw new NotFoundException(`${id} 이 글은 지울수 없습니다.`);
    }

    return SuccessResponse.fromSuccess(true);
  }
  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto,
    user: Auth,
  ) {
    await this.authService.checkExistingUser(user);

    const project = await this.projectRepository.update(id, updateProjectDto);

    if (project.affected === 0) {
      throw new NotFoundException(`${id} 이 글은 수정 할 수 없습니다.`);
    }

    return SuccessResponse.fromSuccess(true);
  }
}
