"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeAuthProvider {
  async generateToken(id) {
    return `fakeTokenWithId${id}`;
  }

  async verifyToken(token) {
    return {
      iat: 123,
      exp: 123,
      sub: token
    };
  }

}

exports.default = FakeAuthProvider;