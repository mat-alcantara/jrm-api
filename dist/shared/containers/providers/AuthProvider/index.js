"use strict";

var _tsyringe = require("tsyringe");

var _JWTAuthProvider = _interopRequireDefault(require("./implementations/JWTAuthProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('AuthProvider', _JWTAuthProvider.default);