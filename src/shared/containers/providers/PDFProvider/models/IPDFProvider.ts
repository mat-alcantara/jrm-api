import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';
import CustomerEntity from '@modules/customers/infra/typeorm/entities/Customer';
import MaterialEntity from '@modules/materials/infra/typeorm/entities/MaterialEntity';

export default interface IPDFProvider {
  createPDF(
    orderToGeneratePDF: OrderEntity,
    customerData: CustomerEntity,
    materialData: MaterialEntity[],
  ): Promise<Buffer>;
}
