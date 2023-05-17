import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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

// @UseGuards(AuthGuard())
@Controller('projects')
export class ProjectController {
  constructor(private proejctService: ProjectService) {}

  @Get('/')
  getAllProjects(): Promise<Project[]> {
    return this.proejctService.getAllProjects();
  }
  @Get('/:id')
  getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.proejctService.getProjectById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProject(
    @Body() createProjectDto: CreateProjectDto,
    @GetUser() user: Auth,
  ): Promise<Project> {
    return this.proejctService.createProject(createProjectDto, user);
  }

  @Delete('/:id')
  deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.proejctService.deleteProject(id);
  }

  @Patch('/:id')
  updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.proejctService.updateProject(id, updateProjectDto);
  }

  // @Patch('/:id/like')
  // handleLikeCount(
  //   @Param('id') id: number,
  //   @GetUser() user: User,
  // ): Promise<boolean> {
  //   return this.proejctService.handleLikeCount(id,user)
  // }

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
