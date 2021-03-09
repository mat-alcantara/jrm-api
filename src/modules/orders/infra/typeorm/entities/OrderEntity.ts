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

import ICutlistDTO from '@modules/orders/dtos/ICutlistDTO';
import OrderStoreEnumDTO from '@modules/orders/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/orders/dtos/PaymentStatusEnumDTO';
import OrderStatusEnumDTO from '@modules/orders/dtos/OrderStatusEnumDTO';

@Entity('orders')
export default class Material {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: true })
  customerId?: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column({ type: 'enum', enum: OrderStoreEnumDTO })
  orderStore: OrderStoreEnumDTO;

  @Column({ type: 'enum', enum: PaymentStatusEnumDTO })
  paymentStatus: PaymentStatusEnumDTO;

  @Column({
    type: 'enum',
    enum: OrderStatusEnumDTO,
  })
  orderStatus: OrderStatusEnumDTO;

  @Column({ nullable: true })
  ps?: string;

  @Column({ nullable: true })
  relatedProblems?: string;

  @Column({ nullable: true })
  conclusionDate?: Date;

  @Column('float')
  price: number;

  @Column('json', { array: true })
  cutlist: ICutlistDTO[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
