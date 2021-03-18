"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

require("dotenv/config");

// This automatically takes ormconfig.json to configure
const server = (0, _typeorm.createConnection)();
var _default = server;
exports.default = _default;