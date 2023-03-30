import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
