import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import IUpdateCutlistDTO from '@modules/orders/dtos/IUpdateCutlistDTO';
import IUpdateOrderDTO from '@modules/orders/dtos/IUpdateOrderDTO';
import ICutlistDTO from '@modules/orders/dtos/ICutlistDTO';

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

  public async deleteCutlist(
    order: OrderEntity,
    cutlistId: string,
  ): Promise<void> {
    const cutlistWithoutDeletedCutlist = order.cutlist.filter(
      cutlist => cutlist.id !== cutlistId,
    );

    this.ordersCreated.splice(this.ordersCreated.indexOf(order), 1);

    // eslint-disable-next-line no-param-reassign
    order.cutlist = cutlistWithoutDeletedCutlist;

    this.ordersCreated.push(order);
  }

  public async updateCutlist(
    order: OrderEntity,
    cutlistId: string,
    cutlistData: IUpdateCutlistDTO,
  ): Promise<OrderEntity> {
    const cutlistToChange = order.cutlist.find(
      currentCutlist => currentCutlist.id === cutlistId,
    );

    if (cutlistToChange) {
      this.ordersCreated.splice(this.ordersCreated.indexOf(order), 1);

      const changedCutlist = { ...cutlistToChange, ...cutlistData };

      // eslint-disable-next-line no-param-reassign
      order.cutlist[order.cutlist.indexOf(cutlistToChange)] = changedCutlist;

      this.ordersCreated.push(order);
    }

    return order;
  }

  public async createCutlist(
    order: OrderEntity,
    cutlist: ICutlistDTO,
  ): Promise<OrderEntity> {
    this.ordersCreated.splice(this.ordersCreated.indexOf(order), 1);

    order.cutlist.push(cutlist);

    this.ordersCreated.push(order);

    return order;
  }

  public async updateOrder(
    orderToUpdate: OrderEntity,
    dataToUpdateOrder: IUpdateOrderDTO,
  ): Promise<OrderEntity> {
    this.ordersCreated.splice(this.ordersCreated.indexOf(orderToUpdate), 1);

    const orderUpdated = { ...orderToUpdate, ...dataToUpdateOrder };

    this.ordersCreated.push(orderUpdated);

    return orderUpdated;
  }
}
