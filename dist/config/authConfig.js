"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  secret: process.env.JWT_SECRET || 'default',
  expiresIn: '7d'
};
exports.default = _default;