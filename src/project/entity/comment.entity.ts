import { User } from 'src/auth/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
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

  @Column({ type: 'simple-array', nullable: true })
  likeUserIds?: string[];

  @Column({ default: 0 })
  likeCount: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  setDefaultLikeUserIds() {
    if (this.likeUserIds === undefined) {
      this.likeUserIds = [];
    }
  }
}
