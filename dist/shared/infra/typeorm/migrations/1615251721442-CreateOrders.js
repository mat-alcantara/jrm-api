"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _OrderStoreEnumDTO = _interopRequireDefault(require("../../../../modules/orders/dtos/OrderStoreEnumDTO"));

var _PaymentStatusEnumDTO = _interopRequireDefault(require("../../../../modules/orders/dtos/PaymentStatusEnumDTO"));

var _OrderStatusEnumDTO = _interopRequireDefault(require("../../../../modules/orders/dtos/OrderStatusEnumDTO"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateOrders1615251721442 {
  async up(queryRunner) {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new _typeorm.Table({
      name: 'orders',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'customerId',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'orderStore',
        type: 'enum',
        enum: [_OrderStoreEnumDTO.default.FRADE, _OrderStoreEnumDTO.default.JAPUIBA, _OrderStoreEnumDTO.default.SAO_JOAO],
        isNullable: false
      }, {
        name: 'paymentStatus',
        type: 'enum',
        enum: [_PaymentStatusEnumDTO.default.ORCAMENTO, _PaymentStatusEnumDTO.default.PAGO, _PaymentStatusEnumDTO.default.PARCIAL, _PaymentStatusEnumDTO.default.RECEBER],
        isNullable: false
      }, {
        name: 'orderStatus',
        type: 'enum',
        enum: [_OrderStatusEnumDTO.default.ENTREGUE, _OrderStatusEnumDTO.default.LIBERADO, _OrderStatusEnumDTO.default.PRODUCAO, _OrderStatusEnumDTO.default.TRANSPORTADO],
        isNullable: false
      }, {
        name: 'ps',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'relatedProblems',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'price',
        type: 'float',
        isNullable: false
      }, {
        name: 'deliveryDate',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'conclusionDate',
        type: 'date',
        isNullable: true
      }, {
        name: 'cutlist',
        type: 'json',
        isNullable: false
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
        isNullable: false
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
        isNullable: false
      }]
    }));
    await queryRunner.createForeignKey('orders', new _typeorm.TableForeignKey({
      name: 'custlistForeignKey',
      columnNames: ['customerId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'customers',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('orders');
  }

}

exports.default = CreateOrders1615251721442;