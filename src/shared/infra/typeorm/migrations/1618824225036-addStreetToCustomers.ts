import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addStreetToCustomers1618824225036
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'customers',
      new TableColumn({
        name: 'street',
        type: 'varchar',
        default: "'Não informado'",
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('customers', 'street');
  }
}
