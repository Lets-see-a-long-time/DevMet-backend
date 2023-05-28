import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateProjectDto } from '../dto/project/create-project.dto';
import { ProjectService } from '../service/project.service';
import { Project } from '../entity/project.entity';
import { UpdateProjectDto } from '../dto/project/update-project.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport/dist';
import { User } from 'src/auth/entity/user.entity';
import { GetUser } from 'src/common/decorator/get-user.dacorator';
import {
  DeleteApi,
  GetApi,
  PatchApi,
  PostApi,
} from 'src/common/decorator/api.decorator';
import SuccessResponse from 'src/common/utils/success.response';

@ApiTags('project')
@Controller('projects')
export class ProjectController {
  constructor(private proejctService: ProjectService) {}

  @GetApi(() => [Project], {
    path: '/',
    description: '프로젝트 목록 조회 ',
    auth: false,
  })
  getAllProjects(): Promise<Project[]> {
    return this.proejctService.getAllProjects();
  }

  @GetApi(() => Project, {
    path: '/:id',
    description: '프로젝트 목록 조회 ',
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
    console.log('user', user);
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
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @GetUser() user: User,
  ) {
    return this.proejctService.updateProject(id, updateProjectDto, user);
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
}
