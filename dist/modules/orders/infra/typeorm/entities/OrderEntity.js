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

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let OrderEntity = (_dec = (0, _typeorm.Entity)('orders'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('uuid'), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)('uuid', {
  nullable: true
}), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.ManyToOne)(() => _Customer.default), _dec7 = (0, _typeorm.JoinColumn)({
  name: 'customerId'
}), _dec8 = Reflect.metadata("design:type", typeof _Customer.default === "undefined" ? Object : _Customer.default), _dec9 = (0, _typeorm.Column)({
  type: 'enum',
  enum: _OrderStoreEnumDTO.default
}), _dec10 = Reflect.metadata("design:type", typeof _OrderStoreEnumDTO.default === "undefined" ? Object : _OrderStoreEnumDTO.default), _dec11 = (0, _typeorm.Column)({
  type: 'enum',
  enum: _PaymentStatusEnumDTO.default
}), _dec12 = Reflect.metadata("design:type", typeof _PaymentStatusEnumDTO.default === "undefined" ? Object : _PaymentStatusEnumDTO.default), _dec13 = (0, _typeorm.Column)({
  type: 'enum',
  enum: _OrderStatusEnumDTO.default
}), _dec14 = Reflect.metadata("design:type", typeof _OrderStatusEnumDTO.default === "undefined" ? Object : _OrderStatusEnumDTO.default), _dec15 = (0, _typeorm.Column)('varchar', {
  nullable: true
}), _dec16 = Reflect.metadata("design:type", String), _dec17 = (0, _typeorm.Column)('varchar', {
  nullable: true
}), _dec18 = Reflect.metadata("design:type", String), _dec19 = (0, _typeorm.Column)('date', {
  nullable: true
}), _dec20 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec21 = (0, _typeorm.Column)('varchar'), _dec22 = Reflect.metadata("design:type", String), _dec23 = (0, _typeorm.Column)('float'), _dec24 = Reflect.metadata("design:type", Number), _dec25 = (0, _typeorm.Column)('json', {
  array: true
}), _dec26 = Reflect.metadata("design:type", Array), _dec27 = (0, _typeorm.CreateDateColumn)(), _dec28 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec29 = (0, _typeorm.UpdateDateColumn)(), _dec30 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = (_class2 = class OrderEntity {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "customerId", _descriptor2, this);

    _initializerDefineProperty(this, "customer", _descriptor3, this);

    _initializerDefineProperty(this, "orderStore", _descriptor4, this);

    _initializerDefineProperty(this, "paymentStatus", _descriptor5, this);

    _initializerDefineProperty(this, "orderStatus", _descriptor6, this);

    _initializerDefineProperty(this, "ps", _descriptor7, this);

    _initializerDefineProperty(this, "relatedProblems", _descriptor8, this);

    _initializerDefineProperty(this, "conclusionDate", _descriptor9, this);

    _initializerDefineProperty(this, "deliveryDate", _descriptor10, this);

    _initializerDefineProperty(this, "price", _descriptor11, this);

    _initializerDefineProperty(this, "cutlist", _descriptor12, this);

    _initializerDefineProperty(this, "created_at", _descriptor13, this);

    _initializerDefineProperty(this, "updated_at", _descriptor14, this);
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "customerId", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "customer", [_dec6, _dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "orderStore", [_dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "paymentStatus", [_dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "orderStatus", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "ps", [_dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "relatedProblems", [_dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "conclusionDate", [_dec19, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "deliveryDate", [_dec21, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "price", [_dec23, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "cutlist", [_dec25, _dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec27, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec29, _dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.default = OrderEntity;