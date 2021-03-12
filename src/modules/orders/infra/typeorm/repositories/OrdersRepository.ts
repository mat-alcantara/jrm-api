import { getRepository, Repository } from 'typeorm';

import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';

export default class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<OrderEntity>;

  constructor() {
    this.ormRepository = getRepository(OrderEntity);
  }

  public async createOrder(orderData: ICreateOrderDTO): Promise<OrderEntity> {
    const orderCreated = await this.ormRepository.create(orderData);

    await this.ormRepository.save(orderCreated);

    return orderCreated;
  }

  public async showAllOrders(): Promise<OrderEntity[]> {
    const allOrders = await this.ormRepository.find();

    return allOrders;
  }

  public async findOrderById(id: string): Promise<OrderEntity | undefined> {
    const specificOrder = await this.ormRepository.findOne({ where: { id } });

    return specificOrder;
  }

  public async deleteOrder(order: OrderEntity): Promise<void> {
    await this.ormRepository.delete(order.id);
  }

  public async deleteCutlist(
    order: OrderEntity,
    cutlistId: string,
  ): Promise<void> {
    console.log('repository');
  }
}
