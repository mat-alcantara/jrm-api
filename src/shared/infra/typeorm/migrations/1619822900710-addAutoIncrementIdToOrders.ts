import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addAutoIncrementIdToOrders1619822900710
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'order_code',
        type: 'int',
        isGenerated: true,
        generationStrategy: 'increment',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'order_code');
  }
}
