"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-shadow */
// interface to use in userType column
var UserTypes;

(function (UserTypes) {
  UserTypes["SELL"] = "sell";
  UserTypes["PRODUCTION"] = "production";
})(UserTypes || (UserTypes = {}));

var _default = UserTypes;
exports.default = _default;