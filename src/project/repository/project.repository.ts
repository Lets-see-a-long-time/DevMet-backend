import { CreateProjectDto } from 'src/project/dto/project/create-project.dto';
import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { Project } from '../entity/project.entity';
import { Auth } from 'src/auth/entity/auth.entity';

@CustomRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async createProejct(
    createProjectDto: CreateProjectDto,
    user: Auth,
  ): Promise<Project> {
    const { title, content, tag } = createProjectDto;
    const project = await this.create({
      title,
      content,
      tag,
      user,
    });

    await this.save(project);
    return project;
  }
}
