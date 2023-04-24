import { Auth } from 'src/auth/entity/auth.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Project, (project) => project.comments)
  project: Project;

  @Column()
  projectId: string;

  @ManyToOne(() => Auth, (user) => user.comments)
  user: Auth;

  @Column()
  userId: string;
}
