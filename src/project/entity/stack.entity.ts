import { ProjectStackType } from 'src/common/enum/enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Stack extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', enum: [ProjectStackType] })
  type: string;

  @Column({ type: String })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
