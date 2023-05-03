import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  role?: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  stack?: string;

  @Column()
  expires: string;
}
