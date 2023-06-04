import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectPositionType } from 'src/common/enum/enum';
import { ProjectPosition } from './project-position.entity';

@Entity()
export class Position extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', enum: [ProjectPositionType] })
  positionType: string;

  @OneToMany(() => ProjectPosition, (projectPositon) => projectPositon.position)
  projectPositions: ProjectPosition[];
}
