import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { ProjectPositionType } from 'src/common/enum/enum';

@Entity()
export class ProjectPosition extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    name: 'ProjectPositionType',
    enum: ProjectPositionType,
  })
  positionType: ProjectPositionType;

  @Column({ type: Number })
  projectId: number;

  @ManyToOne(() => Project, (project) => project.projectPositions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
