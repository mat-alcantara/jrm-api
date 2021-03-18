"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../../infra/typeorm/entities/User"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUsersRepository {
  // Array containing all users created
  usersCreated = []; // Create a new User

  async create(userData) {
    const user = new _User.default();
    Object.assign(user, {
      id: (0, _uuid.v4)()
    }, userData);
    this.usersCreated.push(user);
    return user;
  } // Find a User by email


  async findByEmail(email) {
    const user = this.usersCreated.find(userCreated => userCreated.email === email);
    return user;
  }

}

exports.default = FakeUsersRepository;