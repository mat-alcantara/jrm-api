import OrderStoreEnumDTO from '@modules/orders/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/orders/dtos/PaymentStatusEnumDTO';
import OrderStatusEnumDTO from '@modules/orders/dtos/OrderStatusEnumDTO';

export default interface ICreateOrderDTO {
  customerId?: string;
  orderStore?: OrderStoreEnumDTO;
  paymentStatus?: PaymentStatusEnumDTO;
  orderStatus?: OrderStatusEnumDTO;
  ps?: string;
  relatedProblems?: string;
  conclusionDate?: Date;
  price?: number;
  deliveryDate?: string;
}
