import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/configs/typeorm.module';
import { ProjectService } from 'src/project/services/project.service';
import { ProjectRepository } from 'src/project/repositories/project.repository';
import { ProjectController } from './controller/project.controller';
import { AuthModule } from 'src/user/auth.module';

@Module({
  providers: [ProjectService],
  controllers: [ProjectController],
  imports: [
    TypeOrmExModule.forCustomRepository([ProjectRepository]),
    AuthModule,
  ],
})
export class ProjectModule {}
