import OrderStoreEnumDTO from '@modules/cutlist/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/cutlist/dtos/PaymentStatusEnumDTO';
import OrderStatusEnumDTO from '@modules/cutlist/dtos/OrderStatusEnumDTO';
import ICutlistDTO from '@modules/cutlist/dtos/ICutlistDTO';

export default interface ICreateMaterialDTO {
  customerId: string;
  orderStore: OrderStoreEnumDTO;
  paymentStatus: PaymentStatusEnumDTO;
  orderStatus: OrderStatusEnumDTO;
  ps?: string;
  relatedProblems?: string;
  conclusionDate?: Date;
  price: number;
  cutlist: ICutlistDTO[];
}
