import { Injectable } from '@nestjs/common';
import { Project } from '../entity/project.entity';

import { CreateProjectDto } from '../dto/create-project.dto';
import { ProjectRepository } from 'src/project/repositories/project.repository';

@Injectable()
export class ProjectService {
  constructor(private projectRepository: ProjectRepository) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectRepository.createProejct(createProjectDto);
  }
}
