import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/configs/typeorm.module';
import { ProjectService } from 'src/project/service/project.service';
import { ProjectController } from './controller/project.controller';
import { CommentService } from './service/comment.service';
import { CommentController } from './controller/comment.controller';
import { ProjectRepository } from './repository/project.repository';
import { CommentRepository } from './repository/comment.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/auth/service/user.service';
import { AuthRepository } from 'src/auth/repository/auth.repository';
import { JwtService } from '@nestjs/jwt/dist';

@Module({
  providers: [
    ProjectService,
    CommentService,
    UserService,
    AuthRepository,
    JwtService,
  ],
  controllers: [ProjectController, CommentController],
  imports: [
    TypeOrmExModule.forCustomRepository([ProjectRepository, CommentRepository]),
    AuthModule,
  ],
})
export class ProjectModule {}
