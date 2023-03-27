import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { CreateProjectDto } from '../../application/dto/create-project.dto';
import { Project } from '../../domain/entity/project.entity';

@CustomRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async createProejct(
    createProjectDto: CreateProjectDto,
    // user: User,
  ): Promise<Project> {
    const { title, content } = createProjectDto;

    const project = this.create({
      title,
      content,
      // status: BoardStatus.PUBLIC,
      // user,
    });

    await this.save(project);
    return project;
  }
}
