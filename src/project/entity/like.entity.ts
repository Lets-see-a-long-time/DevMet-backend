import { User } from 'src/auth/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, (user) => user.id, { eager: false })
  @JoinTable()
  @Column()
  userId: string;

  @ManyToMany(() => Project, (project) => project.id, { eager: false })
  @Column({ type: 'bigint' })
  @JoinTable()
  projectId: string;
}