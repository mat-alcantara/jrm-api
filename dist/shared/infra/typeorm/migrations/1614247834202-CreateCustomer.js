"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateCustomer1614247834202 {
  async up(queryRunner) {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new _typeorm.Table({
      name: 'customers',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'email',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'telephone',
        type: 'varchar[]',
        isNullable: false
      }, {
        name: 'area',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'city',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'state',
        type: 'varchar',
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
  }

  async down(queryRunner) {
    await queryRunner.dropTable('customers');
  }

}

exports.default = CreateCustomer1614247834202;