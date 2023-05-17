import { Auth } from 'src/auth/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false })
  title: string;

  @Column({ type: String, nullable: false })
  content: string;

  @Column({ type: String, nullable: false })
  userId: string;

  @ManyToOne(() => Auth)
  @JoinColumn({ name: 'userId' })
  user: Auth;

  @Column('simple-array')
  tag?: string[];

  @Column({ type: 'simple-array', nullable: true })
  likeUserIds?: string[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ default: 0 })
  likeCount: number;
}
