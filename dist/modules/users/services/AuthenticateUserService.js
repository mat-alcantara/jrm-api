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

var _IAuthProvider = _interopRequireDefault(require("../../../shared/containers/providers/AuthProvider/models/IAuthProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('AuthProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default, typeof _IAuthProvider.default === "undefined" ? Object : _IAuthProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class AuthenticateUserService {
  constructor(usersRepository, hashProvider, authProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
    this.authProvider = authProvider;
  }

  async execute(email, password) {
    // Find the user by his email
    const user = await this.usersRepository.findByEmail(email); // If user doesn't exist, throw a new error

    if (!user) {
      throw new _AppError.default('Incorrect email/password combination');
    } // Check if the password is the same as the user's password


    const isPasswordCorrect = await this.hashProvider.checkHash(password, user.password); // If password is incorrect, throw a new error

    if (!isPasswordCorrect) {
      throw new _AppError.default('Incorrect email/password combination');
    } // Generate a new token


    const token = await this.authProvider.generateToken(user.id); // Return token and user

    return {
      user,
      token
    };
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = AuthenticateUserService;