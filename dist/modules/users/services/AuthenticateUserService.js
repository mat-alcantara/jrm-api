"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticateUserService = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class AuthenticateUserService {
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

}) || _class);
exports.default = AuthenticateUserService;