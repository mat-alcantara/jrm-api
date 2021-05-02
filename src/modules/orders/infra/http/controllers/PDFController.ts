import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderPDFService from '@modules/orders/services/CreateOrderPDFService';

export default class PDFController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const createOrderPDFService = await container.resolve(
      CreateOrderPDFService,
    );

    await createOrderPDFService.execute(id);

    return response.json({ message: 'ok' });
  }
}
