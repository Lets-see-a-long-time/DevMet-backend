import { User } from 'src/auth/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { LikeComment } from './like-comment.entity';
import { Project } from './project.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false })
  content: string;

  @Column({ type: String, nullable: false })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: Number, nullable: false })
  projectId: number;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column({ type: Number, nullable: true })
  parentId?: number;

  @OneToMany(() => LikeComment, (likeComment) => likeComment.comment, {
    cascade: true,
  })
  @JoinTable()
  likes: LikeComment[];

  @Column({ default: 0 })
  likeCount: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
