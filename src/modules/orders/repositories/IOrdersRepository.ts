import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import IUpdateCutlistDTO from '@modules/orders/dtos/IUpdateCutlistDTO';
import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

export default interface IOrdersRepository {
  createOrder(orderData: ICreateOrderDTO): Promise<OrderEntity>;
  showAllOrders(): Promise<OrderEntity[]>;
  findOrderById(id: string): Promise<OrderEntity | undefined>;
  deleteOrder(order: OrderEntity): Promise<void>;
  deleteCutlist(order: OrderEntity, cutlistId: string): Promise<void>;
  updateCutlist(
    order: OrderEntity,
    cutlistId: string,
    cutlistData: IUpdateCutlistDTO,
  ): Promise<OrderEntity>;
}
