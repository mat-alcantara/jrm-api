import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';
import IPDFProvider from '@shared/containers/providers/PDFProvider/models/IPDFProvider';

interface IMaterialData {
  name: string;
}

@injectable()
export default class CreateOrderPDFService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,

    @inject('PDFProvider')
    private pdfProvider: IPDFProvider,
  ) {}

  public async execute(orderId: string): Promise<Buffer> {
    const orderToGeneratePDF = await this.ordersRepository.findOrderById(
      orderId,
    );

    if (!orderToGeneratePDF) {
      throw new AppError('Order to create PDF does not exist', 404);
    }

    const { customerId } = orderToGeneratePDF;

    if (!customerId) {
      throw new AppError(
        'Customer of order to generate PDF does not exist',
        404,
      );
    }

    const customerToGeneratePDF = await this.customersRepository.findCustomerById(
      customerId,
    );

    if (!customerToGeneratePDF) {
      throw new AppError(
        'Customer of order to generate PDF does not exist anymore',
        404,
      );
    }

    // Create a material list. If material was removed, return 'Material removido'
    const materialsToGeneratePDF: IMaterialData[] = [];

    for (let i = 0; i < orderToGeneratePDF.cutlist.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const materialSelected = await this.materialsRepository.findMaterialById(
        orderToGeneratePDF.cutlist[i].material_id,
      );

      if (materialSelected) {
        materialsToGeneratePDF.push(materialSelected);
      } else {
        materialsToGeneratePDF.push({ name: 'Material removido' });
      }
    }

    const pdfStream = await this.pdfProvider.createPDF(
      orderToGeneratePDF,
      customerToGeneratePDF,
      materialsToGeneratePDF,
    );

    return pdfStream;
  }
}
