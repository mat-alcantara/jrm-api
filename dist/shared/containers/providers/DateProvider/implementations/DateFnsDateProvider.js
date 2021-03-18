"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

class DateFnsDateProvider {
  defaultDate7Days() {
    if ((0, _dateFns.getDay)(new Date(Date.now())) === 6) {
      return (0, _dateFns.format)((0, _dateFns.addDays)(new Date(Date.now()), 9), 'dd/MM/yyyy');
    }

    return (0, _dateFns.format)((0, _dateFns.addDays)(new Date(Date.now()), 7), 'dd/MM/yyyy');
  }

}

exports.default = DateFnsDateProvider;