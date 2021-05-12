import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import DeliveryTypeEnumDTO from '@modules/orders/dtos/DeliveryTypeEnumDTO';

export default class addDeliveryTypeToOrders1620832784602
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'delivery_type',
        type: 'enum',
        enum: [DeliveryTypeEnumDTO.ENTREGA, DeliveryTypeEnumDTO.LOJA],
        isNullable: false,
        default: "'Retirar na Loja'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'delivery_type');
  }
}
