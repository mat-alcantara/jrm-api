"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeHashProvider {
  async createHash(password) {
    return password;
  }

  async checkHash(password, hashed) {
    return password === hashed;
  }

}

exports.default = FakeHashProvider;