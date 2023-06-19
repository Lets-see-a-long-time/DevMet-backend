import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { Stack } from '../entity/stack.entity';

@CustomRepository(Stack)
export class StackRepository extends Repository<Stack> {}
