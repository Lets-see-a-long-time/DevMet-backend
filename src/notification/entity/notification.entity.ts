import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false })
  message: string;

  @Column({ type: String, nullable: false })
  recipientUserId: number;

  @Column({ type: String, nullable: false })
  senderUserId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
