import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';

import { v4 as uuid_v4 } from 'uuid';

export default class FakeOrdersRepository implements IOrdersRepository {
  private ordersCreated: OrderEntity[];

  constructor() {
    this.ordersCreated = [];
  }

  // Create a new cutlist
  public async createOrder(orderData: ICreateOrderDTO): Promise<OrderEntity> {
    const order = new OrderEntity();

    Object.assign(order, { id: uuid_v4() }, orderData);

    this.ordersCreated.push(order);

    return order;
  }

  public async showAllOrders(): Promise<OrderEntity[]> {
    return this.ordersCreated;
  }

  public async findOrderById(id: string): Promise<OrderEntity | undefined> {
    return this.ordersCreated.find(order => order.id === id);
  }

  public async deleteOrder(order: OrderEntity): Promise<void> {
    await this.ordersCreated.splice(this.ordersCreated.indexOf(order), 1);
  }
}
