"use strict";

var _tsyringe = require("tsyringe");

var _DateFnsDateProvider = _interopRequireDefault(require("./implementations/DateFnsDateProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('DateProvider', _DateFnsDateProvider.default);