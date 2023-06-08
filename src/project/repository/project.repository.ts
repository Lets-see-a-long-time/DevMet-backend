import { CreateProjectDto } from 'src/project/dto/project/create-project.dto';
import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Brackets, Raw, Repository } from 'typeorm';
import { Project } from '../entity/project.entity';
import { User } from 'src/auth/entity/user.entity';
import { ProjectListRequest } from '../dto/project/projects-request';
import { ProjectsRequest } from '../dto/project/project-request';

@CustomRepository(Project)
export class ProjectRepository extends Repository<Project> {
  async createProejct(request: CreateProjectDto, user: User): Promise<Project> {
    const { title, content } = request;
    const project = await this.create({
      title,
      content,
      userId: user.id,
    });

    await this.save(project);
    return project;
  }

  async getAllProjects(projectRequest: ProjectListRequest): Promise<Project[]> {
    const { lastItemId, itemCount, keyword } = projectRequest;

    const where: any[] = [];

    if (keyword) {
      where.push(
        { title: Raw((alias) => `${alias} LIKE '%${keyword}%'`) },
        { content: Raw((alias) => `${alias} LIKE '%${keyword}%'`) },
      );
    }

    const queryBuilder = this.createQueryBuilder('project')
      .where('project.id > :lastItemId', { lastItemId })
      .orderBy('project.id')
      .take(itemCount);

    if (where.length > 0) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          where.forEach((condition) => {
            qb.orWhere(condition);
          });
        }),
      );
    }

    const projects = await queryBuilder.getMany();

    return projects;
  }

  async getMyProjects(
    request: ProjectsRequest,
    user: User,
  ): Promise<Project[]> {
    const { lastItemId, itemCount } = request;

    return this.find({
      where: {
        userId: user.id,
        id: Raw((alias) => `${alias} > ${lastItemId}`),
      },
      order: {
        id: 'ASC',
      },
      take: itemCount,
    });
  }
}
