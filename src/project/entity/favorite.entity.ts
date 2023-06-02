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

@Entity()
export class Favorites extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.favorites, { eager: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: Number })
  projectId: number;

  @ManyToOne(() => Project, (project) => project.favorites, { eager: false })
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
