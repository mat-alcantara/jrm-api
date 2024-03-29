import OrderStoreEnumDTO from '@modules/orders/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/orders/dtos/PaymentStatusEnumDTO';
import OrderStatusEnumDTO from '@modules/orders/dtos/OrderStatusEnumDTO';
import ICutlistDTO from '@modules/orders/dtos/ICutlistDTO';
import DeliveryTypeEnumDTO from '@modules/orders/dtos/DeliveryTypeEnumDTO';

export default interface ICreateOrderDTO {
  customerId: string;
  orderStore: OrderStoreEnumDTO;
  paymentStatus: PaymentStatusEnumDTO;
  orderStatus: OrderStatusEnumDTO;
  ps?: string;
  relatedProblems?: string;
  conclusionDate?: Date;
  price: number;
  cutlist: ICutlistDTO[];
  deliveryDate?: string;
  delivery_type: DeliveryTypeEnumDTO;
}
