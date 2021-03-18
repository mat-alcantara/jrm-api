"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _MaterialController = _interopRequireDefault(require("../controllers/MaterialController"));

var _SpecificMaterialController = _interopRequireDefault(require("../controllers/SpecificMaterialController"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const materialRoutes = (0, _express.Router)();
const materialController = new _MaterialController.default();
const specificMaterialController = new _SpecificMaterialController.default();
materialRoutes.use(_ensureAuthenticated.default);
materialRoutes.get('/materials', materialController.show);
materialRoutes.get('/materials/:id', specificMaterialController.show);
materialRoutes.post('/materials', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: _celebrate.Joi.object().keys({
    name: _celebrate.Joi.string().required(),
    thickness: _celebrate.Joi.number().integer().required(),
    width: _celebrate.Joi.number().integer().required(),
    height: _celebrate.Joi.number().integer().required()
  })
}), materialController.create);
materialRoutes.delete('/materials/:id', materialController.remove);
materialRoutes.put('/materials/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: _celebrate.Joi.object().keys({
    name: _celebrate.Joi.string(),
    thickness: _celebrate.Joi.number().integer(),
    width: _celebrate.Joi.number().integer(),
    height: _celebrate.Joi.number().integer()
  })
}), materialController.update);
var _default = materialRoutes;
exports.default = _default;