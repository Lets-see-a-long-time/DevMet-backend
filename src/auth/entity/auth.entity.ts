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

  @Column()
  image: string;

  @Column()
  role: string;

  @Column()
  nickname: string;

  @Column()
  stack: string;

  @Column()
  expires: string;
}
