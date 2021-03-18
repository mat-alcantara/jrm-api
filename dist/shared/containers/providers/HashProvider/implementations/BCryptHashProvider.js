"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BCryptHashProvider {
  async createHash(password) {
    return _bcryptjs.default.hash(password, 10); // Create a new hashed password and return it
  }

  async checkHash(password, hashed) {
    return _bcryptjs.default.compare(password, hashed); // Check if a password is the same as the hashed password
  }

}

exports.default = BCryptHashProvider;