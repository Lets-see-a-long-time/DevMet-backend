import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { Stack } from './stack.entity';

@Entity()
export class ProjectStack extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stackId: number;

  @ManyToOne(() => Stack, (stack) => stack.projectStacks, { eager: false })
  @JoinColumn({ name: 'userId' })
  stack: Stack;

  @Column({ type: Number })
  projectId: number;

  @ManyToOne(() => Project, (project) => project.likes, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
