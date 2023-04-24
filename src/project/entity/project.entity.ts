import { Auth } from 'src/auth/entity/auth.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column('simple-array')
  tag: string[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ default: 0 })
  likeCount: number;

  @ManyToOne(() => Auth, (user) => user.projects)
  user: Auth;

  @OneToMany(() => Comment, (comment) => comment.project)
  comments: Comment[];

  @ManyToMany(() => Like, (like) => like.projectId)
  like: Like[];
}
