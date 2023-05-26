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
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProjectDto } from '../dto/project/create-project.dto';
import { ProjectService } from '../service/project.service';
import { Project } from '../entity/project.entity';

import { GetUser } from 'src/common/decorator/get-user.decorator';
import { Auth } from 'src/auth/entity/user.entity';
import { UpdateProjectDto } from '../dto/project/update-project.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport/dist';

@ApiTags('project')
@Controller('projects')
export class ProjectController {
  constructor(private proejctService: ProjectService) {}

  @Get('/')
  @ApiOperation({
    summary: '프로젝트 목록 조회',
    description: '프로젝트 목록 조회',
  })
  getAllProjects(): Promise<Project[]> {
    return this.proejctService.getAllProjects();
  }

  @Get('/:id')
  @ApiOperation({
    summary: '프로젝트 조회',
    description: '프로젝트 조회',
  })
  getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.proejctService.getProjectById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '프로젝트 생성',
    description: '프로젝트 생성 ( Required: AccessToken )',
  })
  createProject(
    @Body() createProjectDto: CreateProjectDto,
    @GetUser() user: Auth,
  ): Promise<Project> {
    return this.proejctService.createProject(createProjectDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '프로젝트 삭제',
    description: '프로젝트 삭제 ( Required: AccessToken )',
  })
  deleteProject(@Param('id', ParseIntPipe) id: number, @GetUser() user: Auth) {
    return this.proejctService.deleteProject(id, user);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: '프로젝트 수정',
    description: '프로젝트 삭제 ( Required: AccessToken )',
  })
  @UseGuards(AuthGuard())
  updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @GetUser() user: Auth,
  ) {
    return this.proejctService.updateProject(id, updateProjectDto, user);
  }

  @Put('/:id/like')
  handleLikeCount(
    @Param('id') id: number,
    @GetUser() user: Auth,
  ): Promise<boolean> {
    return this.proejctService.handleLikeCount(id, user);
  }

  // @Patch('/:id/complete')
  // updateBoardComplete(
  //   @Param('id') id: number,
  //   @Body('completed') completed: boolean,
  // ) {
  //   this.boardsService.updateBoardComplete(id, completed);
  // }
  // @Post('/:id/like')
  // updateLikeCount(@Param('id') id: number, @GetUser() user: User): void {
  //   this.boardsService.updateLikeCount(id, user);
  // }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('images'))
  // uploadFile(
  //   @UploadedFile() file: Express.Multer.File,
  //   @GetUser() user: User,
  //   @Body() body,
  // ) {
  //   console.log(file, user, body);
  // }
}
