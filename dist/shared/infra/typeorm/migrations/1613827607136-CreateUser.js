"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateUser1613827607136 {
  async up(queryRunner) {
    // This allows we to use uuid_generate_v4 on id
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users',
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
        isNullable: false
      }, {
        name: 'password',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'userType',
        type: 'enum',
        enum: ['production', 'sell'],
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
    await queryRunner.dropTable('users');
  }

}

exports.default = CreateUser1613827607136;