import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from '../service/project.service';
import { Project } from '../entity/project.entity';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/auth/entity/user.entity';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteApi,
  GetApi,
  PatchApi,
  PostApi,
} from 'src/common/decorator/api.decorator';
import SuccessResponse from 'src/common/utils/success.response';
import { ProjectListRequest } from '../dto/request/project/projects.request';
import { Like } from '../entity/like.entity';
import { Favorites } from '../entity/favorite.entity';
import { Stack } from '../entity/stack.entity';
import { PageRequest } from 'src/common/utils/pagination-request';
import { CreateProjectRequest } from '../dto/request/project/create-project.request';
import { UpdateProjectRequest } from '../dto/request/project/update-project.request';
import ProjectsResponse from '../dto/response/project/projects.response';
import ProjectResponse from '../dto/response/project/project.response';

@ApiTags('project')
@Controller('projects')
export class ProjectController {
  constructor(private proejctService: ProjectService) {}

  @GetApi(() => [ProjectsResponse], {
    path: '/',
    description: '프로젝트 목록 조회 (Optional: AccessToken)',
    auth: false,
  })
  getAllProjects(
    @Query() projectsRequest: ProjectListRequest,
  ): Promise<ProjectsResponse> {
    return this.proejctService.getAllProjects(projectsRequest);
  }

  @GetApi(() => Project, {
    path: '/:id',
    description: '프로젝트 조회 (Optional: AccessToken)',
    auth: false,
  })
  getProjectWithIncreaseViewCount(@Param('id', ParseIntPipe) id: number) {
    return this.proejctService.getProjectWithIncreaseViewCount(id);
  }

  @UsePipes(ValidationPipe)
  @PostApi(() => ProjectResponse, {
    path: '/',
    description: '프로젝트 생성 ( Required: AccessToken )',
    auth: true,
  })
  createProject(
    @Body() request: CreateProjectRequest,
    @GetUser() user: User,
  ): Promise<ProjectResponse> {
    return this.proejctService.createProject(request, user);
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
  updateProject(@Body() request: UpdateProjectRequest, @GetUser() user: User) {
    return this.proejctService.updateProject(request, user);
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
  getMyProjects(@Query() request: PageRequest, @GetUser() user: User) {
    return this.proejctService.getMyProjects(request, user);
  }

  @GetApi(() => [Like], {
    path: '/my/like',
    description: '좋아요 누른 프로젝트 목록 조회  ( Required: AccessToken ) ',
    auth: true,
  })
  getMyLikedProejcts(
    @Query() request: PageRequest,
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
    @Query() request: PageRequest,
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
