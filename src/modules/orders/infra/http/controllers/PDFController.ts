import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderPDFService from '@modules/orders/services/CreateOrderPDFService';

export default class PDFController {
  public async create(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    const createOrderPDFService = await container.resolve(
      CreateOrderPDFService,
    );

    const pdfStream = await createOrderPDFService.execute(id);

    response.writeHead(200, {
      'Content-Length': Buffer.byteLength(pdfStream),
      'Content-Type': 'application/pdf',
      'Content-disposition': 'attachment;filename=test.pdf',
    });

    response.end(pdfStream);
  }
}
