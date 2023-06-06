import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { ProjectPosition } from '../entity/project-position.entity';

@CustomRepository(ProjectPosition)
export class PositionRepository extends Repository<ProjectPosition> {}
