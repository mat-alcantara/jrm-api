import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum UserTypes {
  SELL = 'sell',
  PRODUCTION = 'production',
}

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserTypes, default: UserTypes.SELL })
  userType: UserTypes;
}
