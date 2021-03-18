"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeDateProvider {
  defaultDate7Days() {
    return '01/01/2001';
  }

}

exports.default = FakeDateProvider;