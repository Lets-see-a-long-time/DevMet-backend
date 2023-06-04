import { User } from 'src/auth/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { Position } from './position.entity';

@Entity()
export class ProjectPosition extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: Number })
  positionId: number;

  @ManyToOne(() => Position, (position) => position.projectPositions, {
    eager: false,
  })
  @JoinColumn({ name: 'userId' })
  position: Position;

  @Column({ type: Number })
  projectId: number;

  @ManyToOne(() => Project, (project) => project.likes, { eager: false })
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
