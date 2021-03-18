"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _OrderController = _interopRequireDefault(require("../controllers/OrderController"));

var _SpecificOrderController = _interopRequireDefault(require("../controllers/SpecificOrderController"));

var _CutlistController = _interopRequireDefault(require("../controllers/CutlistController"));

var _OrderStatusEnumDTO = _interopRequireDefault(require("../../../dtos/OrderStatusEnumDTO"));

var _OrderStoreEnumDTO = _interopRequireDefault(require("../../../dtos/OrderStoreEnumDTO"));

var _PaymentStatusEnumDTO = _interopRequireDefault(require("../../../dtos/PaymentStatusEnumDTO"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cutlistRoutes = (0, _express.Router)();
const orderController = new _OrderController.default();
const specificOrderController = new _SpecificOrderController.default();
const cutlistController = new _CutlistController.default();
cutlistRoutes.use(_ensureAuthenticated.default); // Orders

cutlistRoutes.get('/orders', orderController.show);
cutlistRoutes.get('/orders/:id', specificOrderController.show);
cutlistRoutes.post('/orders', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: _celebrate.Joi.object().keys({
    customerId: _celebrate.Joi.string().required(),
    paymentStatus: _celebrate.Joi.string().required().valid(_PaymentStatusEnumDTO.default.ORCAMENTO, _PaymentStatusEnumDTO.default.PAGO, _PaymentStatusEnumDTO.default.PARCIAL, _PaymentStatusEnumDTO.default.RECEBER),
    orderStatus: _celebrate.Joi.string().required().valid(_OrderStatusEnumDTO.default.ENTREGUE, _OrderStatusEnumDTO.default.LIBERADO, _OrderStatusEnumDTO.default.PRODUCAO, _OrderStatusEnumDTO.default.TRANSPORTADO),
    orderStore: _celebrate.Joi.string().required().valid(_OrderStoreEnumDTO.default.FRADE, _OrderStoreEnumDTO.default.JAPUIBA, _OrderStoreEnumDTO.default.SAO_JOAO),
    ps: _celebrate.Joi.string(),
    relatedProblems: _celebrate.Joi.string(),
    conclusionDate: _celebrate.Joi.date(),
    price: _celebrate.Joi.number(),
    cutlist: _celebrate.Joi.array().items(_celebrate.Joi.object().keys({
      material: _celebrate.Joi.string().required(),
      quantidade: _celebrate.Joi.number().integer().required(),
      side_a_size: _celebrate.Joi.number().integer().required(),
      side_b_size: _celebrate.Joi.number().integer().required(),
      side_a_border: _celebrate.Joi.number().integer().required().valid(0, 1, 2),
      side_b_border: _celebrate.Joi.number().integer().required().valid(0, 1, 2)
    }))
  })
}), orderController.create);
cutlistRoutes.delete('/orders/:id', orderController.remove); // Cutlists

cutlistRoutes.delete('/cutlists/:id', cutlistController.remove);
cutlistRoutes.put('/cutlists/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: _celebrate.Joi.object().keys({
    cutlistId: _celebrate.Joi.string(),
    cutlistData: _celebrate.Joi.object().keys({
      quantidade: _celebrate.Joi.number().integer(),
      material: _celebrate.Joi.string(),
      side_a_size: _celebrate.Joi.number().integer(),
      side_b_size: _celebrate.Joi.number().integer(),
      side_a_border: _celebrate.Joi.number().integer().valid(0, 1, 2),
      side_b_border: _celebrate.Joi.number().integer().valid(0, 1, 2)
    })
  })
}), cutlistController.update);
cutlistRoutes.post('/cutlists/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: _celebrate.Joi.object().keys({
    quantidade: _celebrate.Joi.number().integer().required(),
    material: _celebrate.Joi.string().required(),
    side_a_size: _celebrate.Joi.number().integer().required(),
    side_b_size: _celebrate.Joi.number().integer().required(),
    side_a_border: _celebrate.Joi.number().integer().required().valid(0, 1, 2),
    side_b_border: _celebrate.Joi.number().integer().required().valid(0, 1, 2)
  })
}), cutlistController.create);
var _default = cutlistRoutes;
exports.default = _default;