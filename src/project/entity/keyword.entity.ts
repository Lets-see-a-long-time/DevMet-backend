import { ProjectKeywordType } from 'src/common/enum/enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Keyword extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ProjectKeywordType })
  type: ProjectKeywordType;

  @Column({ type: String })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
