import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';
import CustomerEntity from '@modules/customers/infra/typeorm/entities/Customer';

interface IMaterialData {
  name: string;
}

export default interface IPDFProvider {
  createPDF(
    orderToGeneratePDF: OrderEntity,
    customerData: CustomerEntity,
    materialData: IMaterialData[],
  ): Promise<Buffer>;
}
