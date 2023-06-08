import { User } from 'src/auth/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
export class LikeComment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.likes, { eager: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: Number })
  commentId: number;

  @ManyToOne(() => Comment, (comment) => comment.likes, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'commentId' })
  comment: Comment;
}
