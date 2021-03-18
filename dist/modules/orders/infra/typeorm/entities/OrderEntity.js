"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Customer = _interopRequireDefault(require("../../../../customers/infra/typeorm/entities/Customer"));

var _OrderStoreEnumDTO = _interopRequireDefault(require("../../../dtos/OrderStoreEnumDTO"));

var _PaymentStatusEnumDTO = _interopRequireDefault(require("../../../dtos/PaymentStatusEnumDTO"));

var _OrderStatusEnumDTO = _interopRequireDefault(require("../../../dtos/OrderStatusEnumDTO"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let OrderEntity = (_dec = (0, _typeorm.Entity)('orders'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('uuid'), _dec3 = (0, _typeorm.Column)('uuid', {
  nullable: true
}), _dec4 = (0, _typeorm.ManyToOne)(() => _Customer.default), _dec5 = (0, _typeorm.JoinColumn)({
  name: 'customerId'
}), _dec6 = (0, _typeorm.Column)({
  type: 'enum',
  enum: _OrderStoreEnumDTO.default
}), _dec7 = (0, _typeorm.Column)({
  type: 'enum',
  enum: _PaymentStatusEnumDTO.default
}), _dec8 = (0, _typeorm.Column)({
  type: 'enum',
  enum: _OrderStatusEnumDTO.default
}), _dec9 = (0, _typeorm.Column)('varchar', {
  nullable: true
}), _dec10 = (0, _typeorm.Column)('varchar', {
  nullable: true
}), _dec11 = (0, _typeorm.Column)('date', {
  nullable: true
}), _dec12 = (0, _typeorm.Column)('varchar'), _dec13 = (0, _typeorm.Column)('float'), _dec14 = (0, _typeorm.Column)('json', {
  array: true
}), _dec15 = (0, _typeorm.CreateDateColumn)(), _dec16 = (0, _typeorm.UpdateDateColumn)(), _dec(_class = (_class2 = class OrderEntity {
  id = _initializerWarningHelper(_descriptor, this);
  customerId = _initializerWarningHelper(_descriptor2, this);
  customer = _initializerWarningHelper(_descriptor3, this);
  orderStore = _initializerWarningHelper(_descriptor4, this);
  paymentStatus = _initializerWarningHelper(_descriptor5, this);
  orderStatus = _initializerWarningHelper(_descriptor6, this);
  ps = _initializerWarningHelper(_descriptor7, this);
  relatedProblems = _initializerWarningHelper(_descriptor8, this);
  conclusionDate = _initializerWarningHelper(_descriptor9, this);
  deliveryDate = _initializerWarningHelper(_descriptor10, this);
  price = _initializerWarningHelper(_descriptor11, this);
  cutlist = _initializerWarningHelper(_descriptor12, this);
  created_at = _initializerWarningHelper(_descriptor13, this);
  updated_at = _initializerWarningHelper(_descriptor14, this);
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "customerId", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "customer", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "orderStore", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "paymentStatus", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "orderStatus", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "ps", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "relatedProblems", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "conclusionDate", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "deliveryDate", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "price", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "cutlist", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.default = OrderEntity;