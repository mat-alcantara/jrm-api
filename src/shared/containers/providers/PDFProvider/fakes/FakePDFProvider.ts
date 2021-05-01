import IPDFProvider from '@shared/containers/providers/PDFProvider/models/IPDFProvider';

import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';
import CustomerEntity from '@modules/customers/infra/typeorm/entities/Customer';
import MaterialEntity from '@modules/materials/infra/typeorm/entities/MaterialEntity';

export default class FakePDFProvider implements IPDFProvider {
  public async createPDF(
    orderToGeneratePDF: OrderEntity,
    customerData: CustomerEntity,
    materialData: MaterialEntity[],
  ): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = { ...orderToGeneratePDF, ...customerData, ...materialData };
  }
}
