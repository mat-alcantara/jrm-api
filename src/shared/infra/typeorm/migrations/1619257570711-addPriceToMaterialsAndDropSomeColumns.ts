import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addPriceToMaterialsAndDropSomeColumns1619257570711
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('materials', 'thickness');

    await queryRunner.addColumn(
      'materials',
      new TableColumn({
        name: 'price',
        type: 'float',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('materials', 'price');

    await queryRunner.addColumn(
      'materials',
      new TableColumn({
        name: 'thickness',
        type: 'int',
        isNullable: false,
      }),
    );
  }
}
