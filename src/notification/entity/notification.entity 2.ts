import { User } from 'src/auth/entity/user.entity';
import { NotificationType } from 'src/common/enum/enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false })
  message: string;

  @Column({ type: String, nullable: false })
  targetUserId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'targetUserId' })
  user: User;

  @Column({
    type: 'enum',
    name: 'NotificationType',
    enum: NotificationType,
  })
  type: NotificationType;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
