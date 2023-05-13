import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: String, nullable: false })
  name!: string;

  @Column({ type: String, nullable: false })
  userId!: string;

  @Column({ type: String, nullable: false })
  email!: string;

  @Column({ type: String, nullable: false })
  image!: string;

  @Column({ type: String, nullable: true })
  role?: string;

  @Column({ type: String, nullable: true })
  nickname?: string;

  @Column({ type: String, nullable: true })
  stack?: string;

  @Column({ type: String, nullable: true })
  expires?: Date;

  @Column({ type: String, nullable: false })
  provider!: string;
}
