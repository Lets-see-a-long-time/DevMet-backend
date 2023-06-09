import { User } from 'src/auth/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Favorites } from './favorite.entity';
import { Like } from './like.entity';
import {
  ProceedType,
  ProjectStatusType,
  ProjectType,
} from 'src/common/enum/enum';
import { ProjectPosition } from './project-position.entity';
import { ProjectStack } from './project-stack.entity';
import { Tag } from './tag.entity';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false, length: 50 })
  title: string;

  @Column({ type: String, nullable: false })
  content: string;

  @Column({
    type: 'enum',
    name: 'ProjectType',
    enum: ProjectType,
  })
  type: ProjectType;

  @Column({
    type: 'enum',
    name: 'ProceedType',
    enum: ProceedType,
  })
  proceedType: ProceedType;

  @Column({
    type: 'enum',
    name: 'status',
    enum: ProjectStatusType,
    default: ProjectStatusType.RECRUITING,
  })
  status: ProjectStatusType;

  @Column({ type: Number, nullable: false })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Tag, (tag) => tag.project, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => ProjectStack, (projectStack) => projectStack.project, {
    cascade: true,
  })
  @JoinTable()
  projectStacks: ProjectStack[];

  @OneToMany(
    () => ProjectPosition,
    (projectPosition) => projectPosition.project,
    { cascade: true },
  )
  @JoinTable()
  projectPositions: ProjectPosition[];

  @Column({ type: Number, default: 5 })
  numberOfRecruits: number;

  @Column({ type: Number, default: 0 })
  viewCount: number;

  @Column({ type: Number, default: 0 })
  commentCount: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: Date, default: '2023-06-06 19:14:41' })
  recuitmentDeadLine: Date;

  @OneToMany(() => Like, (like) => like.project, { cascade: true })
  @JoinTable()
  likes: Like[];

  @OneToMany(() => Favorites, (favorites) => favorites.project, {
    cascade: true,
  })
  @JoinTable()
  favorites: Favorites[];

  @Column({ default: 0 })
  likeCount: number;
}
