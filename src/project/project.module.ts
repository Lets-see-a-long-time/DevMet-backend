import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/configs/typeorm.module';
import { ProjectService } from 'src/project/services/project.service';
import { ProjectController } from './controller/project.controller';
import { AuthModule } from 'src/user/auth.module';
import { CommentService } from './services/comment.service';
import { CommentController } from './controller/comment.controller';
import { ProjectRepository } from './repository/project.repository';
import { LikeRepository } from './repository/like.repository';
import { CommentRepository } from './repository/comment.repository';

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
