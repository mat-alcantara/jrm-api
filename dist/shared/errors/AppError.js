"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Error {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }

}

exports.default = Error;