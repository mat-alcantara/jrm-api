import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import OrderStoreEnumDTO from '@modules/cutlist/dtos/OrderStoreEnumDTO';
import PaymentStatusEnumDTO from '@modules/cutlist/dtos/PaymentStatusEnumDTO';
import OrderStatusEnumDTO from '@modules/cutlist/dtos/OrderStatusEnumDTO';

export default class CreateOrders1615251721442 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'customerId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'orderStore',
            type: 'enum',
            enum: [
              OrderStoreEnumDTO.FRADE,
              OrderStoreEnumDTO.JAPUIBA,
              OrderStoreEnumDTO.SAO_JOAO,
            ],
            isNullable: false,
          },
          {
            name: 'paymentStatus',
            type: 'enum',
            enum: [
              PaymentStatusEnumDTO.ORCAMENTO,
              PaymentStatusEnumDTO.PAGO,
              PaymentStatusEnumDTO.PARCIAL,
              PaymentStatusEnumDTO.RECEBER,
            ],
            isNullable: false,
          },
          {
            name: 'orderStatus',
            type: 'enum',
            enum: [
              OrderStatusEnumDTO.ENTREGUE,
              OrderStatusEnumDTO.LIBERADO,
              OrderStatusEnumDTO.PRODUCAO,
              OrderStatusEnumDTO.TRANSPORTADO,
            ],
            isNullable: false,
          },
          {
            name: 'ps',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'relatedProblems',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'conclusionDate',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'cutlist',
            type: 'json',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'custlistForeignKey',
        columnNames: ['customerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
