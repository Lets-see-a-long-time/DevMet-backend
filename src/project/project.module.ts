import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/configs/typeorm.module';
import { ProjectService } from 'src/project/service/project.service';
import { ProjectController } from './controller/project.controller';
import { CommentService } from './service/comment.service';
import { CommentController } from './controller/comment.controller';
import { ProjectRepository } from './repository/project.repository';
import { CommentRepository } from './repository/comment.repository';
import { AuthModule } from 'src/auth/auth.module';
import { AuthRepository } from 'src/auth/repository/auth.repository';
import { JwtService } from '@nestjs/jwt/dist';
import { LikeRepository } from './repository/like.repository';
import { FavoritesRepository } from './repository/favorites.repository';
import { PositionRepository } from './repository/position.repository';
import { StackRepository } from './repository/stack.repository';
import { ProjectStackRepository } from './repository/project-stack.repository';
import { TagRepository } from './repository/tag.repository';
import { LikeCommentRepository } from './repository/like-comment.repository';
import { NotificationGateway } from 'src/notification/notification.gateway';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationRepository } from 'src/notification/repository/alarm.repository';
import { AuthService } from 'src/auth/service/auth.service';
import { UserRepository } from 'src/auth/repository/user.repository';
import { UploadController } from './controller/upload.controller';
import { UploadService } from './service/upload.service';

@Module({
  providers: [
    ProjectService,
    CommentService,
    AuthService,
    AuthRepository,
    JwtService,
    NotificationGateway,
    NotificationService,
    UploadService,
  ],
  controllers: [ProjectController, CommentController, UploadController],
  imports: [
    TypeOrmExModule.forCustomRepository([
      ProjectRepository,
      CommentRepository,
      LikeRepository,
      FavoritesRepository,
      PositionRepository,
      StackRepository,
      ProjectStackRepository,
      TagRepository,
      LikeCommentRepository,
      NotificationRepository,
      UserRepository,
    ]),
    AuthModule,
  ],
})
export class ProjectModule {}
