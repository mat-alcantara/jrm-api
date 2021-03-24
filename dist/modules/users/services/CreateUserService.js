"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _IHashProvider = _interopRequireDefault(require("../../../shared/containers/providers/HashProvider/models/IHashProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateUserService {
  constructor(usersRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute(data) {
    const {
      name,
      email,
      password,
      userType
    } = data; // Use findByEmail method to check if the user exists

    const checkIfUserExists = await this.usersRepository.findByEmail(email); // If user exists, it'll return a error

    if (checkIfUserExists) {
      throw new _AppError.default('Email address already used.');
    } // Hash the password with bcrypt


    const hashedPassword = await this.hashProvider.createHash(password); // Create a new User in database

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      // Database will have only the hashed password
      userType
    });
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateUserService;