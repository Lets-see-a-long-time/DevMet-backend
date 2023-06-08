import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProjectDto } from '../dto/project/create-project.dto';
import { ProjectService } from '../service/project.service';
import { Project } from '../entity/project.entity';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/auth/entity/user.entity';
import { UpdateProjectDto } from '../dto/project/update-project.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteApi,
  GetApi,
  PatchApi,
  PostApi,
} from 'src/common/decorator/api.decorator';
import SuccessResponse from 'src/common/utils/success.response';
import { ProjectListRequest } from '../dto/project/projects-request';
import { Like } from '../entity/like.entity';
import { Favorites } from '../entity/favorite.entity';
import { Stack } from '../entity/stack.entity';
import { ProjectsRequest } from '../dto/project/project-request';

@ApiTags('project')
@Controller('projects')
export class ProjectController {
  constructor(private proejctService: ProjectService) {}

  @GetApi(() => [Project], {
    path: '/',
    description: '프로젝트 목록 조회 (Optional: AccessToken)',
    auth: false,
  })
  getAllProjects(
    @Query() projectsRequest: ProjectListRequest,
  ): Promise<Project[]> {
    return this.proejctService.getAllProjects(projectsRequest);
  }

  @GetApi(() => Project, {
    path: '/:id',
    description: '프로젝트 조회 (Optional: AccessToken)',
    auth: false,
  })
  getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.proejctService.getProjectById(id);
  }

  @UsePipes(ValidationPipe)
  @PostApi(() => Project, {
    path: '/',
    description: '프로젝트 생성 ( Required: AccessToken )',
    auth: true,
  })
  createProject(
    @Body() createProjectDto: CreateProjectDto,
    @GetUser() user: User,
  ): Promise<Project> {
    return this.proejctService.createProject(createProjectDto, user);
  }

  @DeleteApi(() => Project, {
    path: '/:id',
    description: '프로젝트 삭제 ( Required: AccessToken )',
    auth: true,
  })
  deleteProject(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.proejctService.deleteProject(id, user);
  }

  @PatchApi(() => Project, {
    path: '/:id',
    description: '프로젝트 수정 ( Required: AccessToken )',
    auth: true,
  })
  updateProject(
    @Body() updateProjectDto: UpdateProjectDto,
    @GetUser() user: User,
  ) {
    return this.proejctService.updateProject(updateProjectDto, user);
  }

  @PatchApi(() => SuccessResponse, {
    path: '/:id/like',
    description: '프로젝트 좋아요 ( Required: AccessToken )',
    auth: true,
  })
  handleLikeCount(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<SuccessResponse> {
    return this.proejctService.handleLikeCount(id, user);
  }

  @PatchApi(() => SuccessResponse, {
    path: '/:id/favorites',
    description: '프로젝트 즐겨찾기 ( Required: AccessToken )',
    auth: true,
  })
  handlefavorites(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<SuccessResponse> {
    return this.proejctService.handlefavorites(id, user);
  }

  @GetApi(() => [Project], {
    path: '/my/project',
    description: '자신이 작성한 프로젝트 목록 조회  ( Required: AccessToken ) ',
    auth: true,
  })
  getMyProjects(@Query() request: ProjectsRequest, @GetUser() user: User) {
    return this.proejctService.getMyProjects(request, user);
  }

  @GetApi(() => [Like], {
    path: '/my/like',
    description: '좋아요 누른 프로젝트 목록 조회  ( Required: AccessToken ) ',
    auth: true,
  })
  getMyLikedProejcts(
    @Query() request: ProjectsRequest,
    @GetUser() user: User,
  ): Promise<Like[]> {
    return this.proejctService.getMyLikedProejcts(request, user);
  }

  @GetApi(() => [Favorites], {
    path: '/my/favorites',
    description: '즐겨찾기 누른 프로젝트 목록 조회  ( Required: AccessToken ) ',
    auth: true,
  })
  getMyFavoritesProejcts(
    @Query() request: ProjectsRequest,
    @GetUser() user: User,
  ): Promise<Favorites[]> {
    return this.proejctService.getMyFavoritesProejcts(request, user);
  }

  @GetApi(() => [Stack], {
    path: '/project/stacks',
    description: '스택 목록  ( Optional: AccessToken ) ',
    auth: false,
  })
  getStacks(): Promise<Stack[]> {
    return this.proejctService.getStacks();
  }
}
