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

let CreateUserService = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class CreateUserService {
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

}) || _class);
exports.default = CreateUserService;