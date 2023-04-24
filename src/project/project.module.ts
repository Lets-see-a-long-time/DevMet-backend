import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/configs/typeorm.module';
import { ProjectService } from 'src/project/service/project.service';
import { ProjectController } from './controller/project.controller';
import { CommentService } from './service/comment.service';
import { CommentController } from './controller/comment.controller';
import { ProjectRepository } from './repository/project.repository';
import { LikeRepository } from './repository/like.repository';
import { CommentRepository } from './repository/comment.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ProjectService, CommentService],
  controllers: [ProjectController, CommentController],
  imports: [
    TypeOrmExModule.forCustomRepository([
      ProjectRepository,
      LikeRepository,
      CommentRepository,
    ]),
    AuthModule,
  ],
})
export class ProjectModule {}
