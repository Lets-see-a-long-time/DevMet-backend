import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Auth')
export class Token extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  picture: string;

  @Column()
  sub?: number;

  @Column()
  iat: number;

  @Column()
  exp: string;

  @Column()
  jti: string;

  @Column()
  expires: string;
}
