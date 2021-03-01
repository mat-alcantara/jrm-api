import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';

import ICutlistDTO from '@modules/cutlist/dtos/ICutlistDTO';
import OrderStoreEnumDTO from '@modules/cutlist/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/cutlist/dtos/PaymentStatusEnumDTO';
import OrderStatusEnumDTO from '@modules/cutlist/dtos/OrderStatusEnumDTO';

@Entity('cutlists')
export default class Material {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customerId: string;

  @JoinColumn({ name: 'customerId' })
  @ManyToOne(() => Customer)
  customer: Customer;

  @Column({ type: 'enum', enum: OrderStoreEnumDTO })
  orderStore: OrderStoreEnumDTO;

  @Column({ type: 'enum', enum: PaymentStatusEnumDTO })
  paymentStatus: PaymentStatusEnumDTO;

  @Column({
    type: 'enum',
    enum: OrderStatusEnumDTO,
    default: OrderStatusEnumDTO,
  })
  orderStatus: OrderStatusEnumDTO;

  @Column()
  ps: string;

  @Column()
  relatedProblems: string;

  @Column()
  conclusionDate: Date;

  @Column('float')
  price: number;

  @Column({ array: true })
  cutlist: ICutlistDTO[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
