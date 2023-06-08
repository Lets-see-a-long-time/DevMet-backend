import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/configs/typeorm.module';
import { ProjectService } from 'src/project/service/project.service';
import { ProjectController } from './controller/project.controller';
import { CommentService } from './service/comment.service';
import { CommentController } from './controller/comment.controller';
import { ProjectRepository } from './repository/project.repository';
import { CommentRepository } from './repository/comment.repository';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/service/auth.service';
import { AuthRepository } from 'src/auth/repository/auth.repository';
import { JwtService } from '@nestjs/jwt/dist';
import { LikeRepository } from './repository/like.repository';
import { FavoritesRepository } from './repository/favorites.repository';
import { PositionRepository } from './repository/position.repository';
import { StackRepository } from './repository/stack.repository';
import { ProjectStackRepository } from './repository/project-stack.repository';
import { TagRepository } from './repository/tag.repository';
import { LikeCommentRepository } from './repository/like-comment.repository';

@Module({
  providers: [
    ProjectService,
    CommentService,
    AuthService,
    AuthRepository,
    JwtService,
  ],
  controllers: [ProjectController, CommentController],
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
    ]),
    AuthModule,
  ],
})
export class ProjectModule {}
