import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../../domain/entity/project.entity';
import { ProjectRepository } from '../../infrastructure/sql/project.repository';
import { CreateProjectDto } from '../dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectRepository)
    private projectRepository: ProjectRepository,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectRepository.createProejct(createProjectDto);
  }
}
