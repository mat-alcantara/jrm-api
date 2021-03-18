"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../entities/User"));

var _typeorm = require("typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  // User Repository
  constructor() {
    this.ormRepository = (0, _typeorm.getRepository)(_User.default);
  } // Method used to create a new User in database


  async create(data) {
    const user = await this.ormRepository.create(data);
    this.ormRepository.save(user);
    return user;
  } // Method used to find a user by his email


  async findByEmail(email) {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    });
    return user;
  }

}

exports.default = UsersRepository;