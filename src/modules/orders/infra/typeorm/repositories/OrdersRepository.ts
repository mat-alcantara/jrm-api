import { getRepository, Repository } from 'typeorm';

import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import IUpdateCutlistDTO from '@modules/orders/dtos/IUpdateCutlistDTO';
import ICutlistDTO from '@modules/orders/dtos/ICutlistDTO';

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
    const orderWithoutCutlist = order.cutlist.filter(
      currentOrder => currentOrder.id !== cutlistId,
    );

    const newOrder = order;

    newOrder.cutlist = orderWithoutCutlist;

    await this.ormRepository.save({ ...order, ...newOrder }); // Update a cutlist
  }

  public async updateCutlist(
    order: OrderEntity,
    cutlistId: string,
    cutlistData: IUpdateCutlistDTO,
  ): Promise<OrderEntity> {
    const orderToUpdate = order;
    const cutlistToUpdate = order.cutlist.find(
      currentCutlist => currentCutlist.id === cutlistId,
    );

    if (cutlistToUpdate) {
      const cutlistUpdated = { ...cutlistToUpdate, ...cutlistData };

      orderToUpdate.cutlist[
        orderToUpdate.cutlist.indexOf(cutlistToUpdate)
      ] = cutlistUpdated;

      await this.ormRepository.save(orderToUpdate);
    }

    return orderToUpdate;
  }

  public async createCutlist(
    order: OrderEntity,
    cutlist: ICutlistDTO,
  ): Promise<OrderEntity> {
    order.cutlist.push(cutlist);

    await this.ormRepository.save(order);

    return order;
  }
}
