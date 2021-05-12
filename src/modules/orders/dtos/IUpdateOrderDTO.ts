import OrderStoreEnumDTO from '@modules/orders/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/orders/dtos/PaymentStatusEnumDTO';
import OrderStatusEnumDTO from '@modules/orders/dtos/OrderStatusEnumDTO';
import DeliveryTypeEnumDTO from '@modules/orders/dtos/DeliveryTypeEnumDTO';

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
  delivery_type: DeliveryTypeEnumDTO;
}
