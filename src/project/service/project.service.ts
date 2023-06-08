import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '../entity/project.entity';
import { CreateProjectDto } from '../dto/project/create-project.dto';
import { UpdateProjectDto } from '../dto/project/update-project.dto';
import SuccessResponse from 'src/common/utils/success.response';
import { ProjectRepository } from '../repository/project.repository';
import { User } from 'src/auth/entity/user.entity';
import { AuthService } from 'src/auth/service/auth.service';
import { LikeRepository } from '../repository/like.repository';
import { Like } from '../entity/like.entity';
import { FavoritesRepository } from '../repository/favorites.repository';
import { Favorites } from '../entity/favorite.entity';
import { PositionRepository } from '../repository/position.repository';
import { StackRepository } from '../repository/stack.repository';
import { Stack } from '../entity/stack.entity';
import { ProjectStackRepository } from '../repository/project-stack.repository';
import { TagRepository } from '../repository/tag.repository';
import { ProjectListRequest } from '../dto/project/projects-request';
import { ProjectsRequest } from '../dto/project/project-request';

@Injectable()
export class ProjectService {
  constructor(
    private projectRepository: ProjectRepository,
    private authService: AuthService,
    private likeRepository: LikeRepository,
    private favoritesRepository: FavoritesRepository,
    private positionRepository: PositionRepository,
    private stackRepository: StackRepository,
    private projectStackRepository: ProjectStackRepository,
    private tagRepository: TagRepository,
  ) {}

  async getAllProjects(projectRequest: ProjectListRequest): Promise<Project[]> {
    return this.projectRepository.getAllProjects(projectRequest);
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
    const newProject = await this.projectRepository.createProejct(
      createProjectDto,
      user,
    );

    for (const tag of createProjectDto.tags) {
      const newTag = await this.tagRepository.create({
        tag: tag,
        projectId: newProject.id,
      });
      await this.tagRepository.save(newTag);
    }

    for (const stack of createProjectDto.stacks) {
      const newStack = await this.projectStackRepository.create({
        stackId: stack,
        projectId: newProject.id,
      });

      await this.projectStackRepository.save(newStack);
    }

    for (const position of createProjectDto.position) {
      const newPosition = await this.positionRepository.create({
        positionType: position,
        projectId: newProject.id,
      });

      await this.positionRepository.save(newPosition);
    }

    return newProject;
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

    if (!project) {
      throw new NotFoundException(`프로젝트를 찾을수 없습니다.`);
    }

    const isLike = await this.likeRepository.findOneBy({
      projectId: id,
      userId: user.id,
    });

    if (isLike) {
      await this.likeRepository.delete({
        projectId: id,
        userId: user.id,
      });
    } else {
      const create = await this.likeRepository.create({
        projectId: id,
        userId: user.id,
      });
      await this.likeRepository.save(create);
    }

    const countOfLike = await this.likeRepository.count({
      where: {
        projectId: id,
      },
    });

    project.likeCount = countOfLike;

    await this.projectRepository.save(project);

    return SuccessResponse.fromSuccess(true);
  }

  async handlefavorites(id: number, user: User): Promise<SuccessResponse> {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) {
      throw new NotFoundException(`프로젝트를 찾을수 없습니다.`);
    }

    const isFavorites = await this.favoritesRepository.findOneBy({
      projectId: id,
      userId: user.id,
    });

    if (isFavorites) {
      await this.favoritesRepository.delete({
        projectId: id,
        userId: user.id,
      });
    } else {
      const create = await this.favoritesRepository.create({
        projectId: id,
        userId: user.id,
      });

      await this.favoritesRepository.save(create);
    }

    return SuccessResponse.fromSuccess(true);
  }

  async getMyProjects(
    request: ProjectsRequest,
    user: User,
  ): Promise<Project[]> {
    return this.projectRepository.getMyProjects(request, user);
  }

  async getMyLikedProejcts(
    request: ProjectsRequest,
    user: User,
  ): Promise<Like[]> {
    return this.likeRepository.getMyLikedProejcts(request, user);
  }

  async getMyFavoritesProejcts(
    request: ProjectsRequest,
    user: User,
  ): Promise<Favorites[]> {
    return this.favoritesRepository.getMyFavoritesProejcts(request, user);
  }

  async getStacks(): Promise<Stack[]> {
    return this.stackRepository.find();
  }
}
