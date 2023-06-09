import { ProjectStackType } from 'src/common/enum/enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectStack } from './project-stack.entity';

@Entity()
export class Stack extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    name: 'ProjectStackType',
    enum: ProjectStackType,
  })
  type: ProjectStackType;

  @OneToMany(() => ProjectStack, (projectStack) => projectStack.stack)
  projectStacks: ProjectStack[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
