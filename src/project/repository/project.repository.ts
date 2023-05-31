import { CreateProjectDto } from 'src/project/dto/project/create-project.dto';
import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { Project } from '../entity/project.entity';
import { User } from 'src/auth/entity/user.entity';

@CustomRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async createProejct(request: CreateProjectDto, user: User): Promise<Project> {
    const { title, content, tag } = request;
    const project = await this.create({
      title,
      content,
      tag,
      userId: user.id,
    });

    await this.save(project);
    return project;
  }
}
