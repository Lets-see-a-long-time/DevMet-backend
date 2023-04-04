import { Project } from 'src/project/entity/project.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
  // eager 유저를 가져올때 보드도 가져옴.
  //   @OneToMany((type) => Project, (project) => project.user, { eager: false })
  //   projects: Project[];
}
