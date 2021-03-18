"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateMaterial1614531313984 {
  async up(queryRunner) {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new _typeorm.Table({
      name: 'materials',
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
        name: 'thickness',
        type: 'int',
        isNullable: false
      }, {
        name: 'width',
        type: 'int',
        isNullable: false
      }, {
        name: 'height',
        type: 'int',
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
    await queryRunner.dropTable('materials');
  }

}

exports.default = CreateMaterial1614531313984;