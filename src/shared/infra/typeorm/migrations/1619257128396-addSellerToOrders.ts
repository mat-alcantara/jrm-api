import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addSellerToOrders1619257128396
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'seller',
        type: 'varchar',
        default: "'Não informado'",
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'seller');
  }
}
