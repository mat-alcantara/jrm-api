"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// eslint-disable-next-line no-shadow
var OrderStatus;

(function (OrderStatus) {
  OrderStatus["PRODUCAO"] = "Em Produ\xE7\xE3o";
  OrderStatus["LIBERADO"] = "Liberado para Transporte";
  OrderStatus["TRANSPORTADO"] = "Transportado";
  OrderStatus["ENTREGUE"] = "Entregue";
})(OrderStatus || (OrderStatus = {}));

var _default = OrderStatus;
exports.default = _default;