"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// eslint-disable-next-line no-shadow
var PaymentStatus;

(function (PaymentStatus) {
  PaymentStatus["RECEBER"] = "Receber na Entrega";
  PaymentStatus["PARCIAL"] = "Parcialmente Pago";
  PaymentStatus["PAGO"] = "Pago";
  PaymentStatus["ORCAMENTO"] = "Or\xE7amento";
})(PaymentStatus || (PaymentStatus = {}));

var _default = PaymentStatus;
exports.default = _default;