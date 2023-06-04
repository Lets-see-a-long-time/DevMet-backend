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
import { ProceedType, ProjectType } from 'src/common/enum/enum';
import { ProjectPosition } from './project-position.entity';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false })
  title: string;

  @Column({ type: String, nullable: false })
  content: string;

  @Column({ type: String, enum: ProjectType, nullable: false })
  type: string;

  @Column({ type: String, enum: ProceedType, nullable: false })
  proceedType: string;

  @Column({ type: Number, nullable: false })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('simple-array')
  tag?: string[];

  @Column('simple-array')
  stack?: string[];

  @OneToMany(
    () => ProjectPosition,
    (projectPosition) => projectPosition.project,
  )
  projectPositions: ProjectPosition[];

  @Column({ type: Number })
  numberOfRecruits: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: Date })
  recuitmentDeadLine: Date;

  @OneToMany(() => Like, (like) => like.project)
  @JoinTable()
  likes: Like[];

  @OneToMany(() => Favorites, (favorites) => favorites.project)
  @JoinTable()
  favorites: Favorites[];

  @Column({ default: 0 })
  likeCount: number;
}
