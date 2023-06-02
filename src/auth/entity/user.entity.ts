import { Favorites } from 'src/project/entity/favorite.entity';
import { Like } from 'src/project/entity/like.entity';
import { Project } from 'src/project/entity/project.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProviderProps, StackProps } from '../types/userinfo.type';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false })
  name!: string;

  @Column({ type: String, nullable: false })
  userId!: string;

  @Column({ type: String, nullable: false })
  email!: string;

  @Column({ type: String, nullable: false })
  image!: string;

  @Column({ type: String, nullable: true })
  role?: string;

  @Column({ type: String, nullable: true })
  nickname?: string;

  @Column({ type: String, nullable: true })
  stack?: StackProps;

  @Column({ type: String, nullable: true })
  expires?: Date;

  @Column({ type: String, nullable: false })
  provider!: ProviderProps;

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Favorites, (favorites) => favorites.user)
  favorites: Favorites[];

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
