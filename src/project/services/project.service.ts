import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '../entity/project.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { ProjectRepository } from 'src/project/repositories/project.repository';
import { UpdateProjectDto } from '../dto/update-project.dto';
import SuccessResponse from 'src/common/utils/success.response';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class ProjectService {
  constructor(private projectRepository: ProjectRepository) {}

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
    user: User,
  ): Promise<Project> {
    return this.projectRepository.createProejct(createProjectDto, user);
  }

  async deleteProject(id: number) {
    const project = await this.projectRepository.delete({ id });

    if (project.affected === 0) {
      throw new NotFoundException(`${id} 이 글은 지울수 없습니다.`);
    }

    return SuccessResponse.fromSuccess(true);
  }
  async updateProject(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.update(id, updateProjectDto);
    if (project.affected === 0) {
      throw new NotFoundException(`${id} 이 글은 수정 할 수 없습니다.`);
    }
    return SuccessResponse.fromSuccess(true);
  }
}
