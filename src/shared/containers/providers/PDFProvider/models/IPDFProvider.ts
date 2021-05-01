import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

export default interface IPDFProvider {
  createPDF(orderToGeneratePDF: OrderEntity): Promise<void>;
}
