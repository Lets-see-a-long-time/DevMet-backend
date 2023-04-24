import { Comment } from 'src/project/entity/comment.entity';
import { Like } from 'src/project/entity/like.entity';
import { Project } from 'src/project/entity/project.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  expires: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Auth;

  @OneToMany(() => Comment, (comment) => comment.userId)
  comments: Comment;

  @OneToMany(() => Like, (like) => like.userId)
  likes: Like;
}
