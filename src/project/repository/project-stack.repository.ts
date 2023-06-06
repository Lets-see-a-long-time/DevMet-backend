import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { ProjectStack } from '../entity/project-stack.entity';

@CustomRepository(ProjectStack)
export class ProjectStackRepository extends Repository<ProjectStack> {}
