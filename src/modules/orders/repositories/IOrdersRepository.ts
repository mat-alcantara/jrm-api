import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

export default interface IMaterialsRepository {
  createCutlist(cutlistData: ICreateOrderDTO): Promise<OrderEntity>;
  showAllCutlists(): Promise<OrderEntity[]>;
  findCutlistById(id: string): Promise<OrderEntity | undefined>;
  deleteCutlist(cutlist: OrderEntity): Promise<void>;
}
