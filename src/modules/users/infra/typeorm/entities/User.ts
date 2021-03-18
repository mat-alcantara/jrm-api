/* eslint-disable no-shadow */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import UserTypes from '@modules/users/dtos/UserTypes';

// Entity for all users in the application
@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  @Exclude()
  password: string;

  // userType will only allow 'sell' and 'production'
  @Column({ type: 'enum', enum: UserTypes, default: UserTypes.SELL })
  userType: UserTypes;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
