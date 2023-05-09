import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Auth')
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  userId: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  role?: string;

  @Column({ nullable: true })
  nickname?: string;

  @Column({ nullable: true })
  stack?: string;

  @Column({ nullable: true })
  expires?: string;
}
