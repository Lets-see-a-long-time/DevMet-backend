import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/configs/typeorm.module';
import { ProjectService } from './application/service/project.service';
import { ProjectRepository } from './infrastructure/sql/project.repository';
import { ProjectController } from './interface/rest-api/project.controller';

@Module({
  providers: [ProjectService],
  controllers: [ProjectController],
  imports: [TypeOrmExModule.forCustomRepository([ProjectRepository])],
})
export class ProjectModule {}
