/* eslint-disable no-shadow */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import UserTypes from '@modules/users/dtos/UserTypes';

// Entity for all users in the application
@Entity('users')
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
