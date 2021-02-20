/* eslint-disable no-shadow */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// interface to use in userType column
enum UserTypes {
  SELL = 'sell',
  PRODUCTION = 'production',
}

// Entity for all users in the application
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

  // userType will only allow 'sell' and 'production'
  @Column({ type: 'enum', enum: UserTypes, default: UserTypes.SELL })
  userType: UserTypes;

  @CreateDateColumn('timestamp with time zone')
  created_at: Date;

  @UpdateDateColumn('timestamp with time zone')
  updated_at: Date;
}
