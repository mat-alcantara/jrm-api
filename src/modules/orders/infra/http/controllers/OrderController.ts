import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ShowAllOrdersService from '@modules/orders/services/ShowAllOrdersService';
import DeleteOrderService from '@modules/orders/services/DeleteOrderService';

export default class OrderController {
  public async create(request: Request, response: Response): Promise<Response> {
    const ordersData = request.body;

    const createOrderService = await container.resolve(CreateOrderService);

    const orderCreated = await createOrderService.execute(ordersData);

    return response.json(orderCreated);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showAllOrdersService = await container.resolve(ShowAllOrdersService);

    const allOrders = await showAllOrdersService.execute();

    return response.json(allOrders);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteOrderService = await container.resolve(DeleteOrderService);

    await deleteOrderService.execute(id);

    return response.json();
  }
}
