"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _AuthenticateUserService = _interopRequireDefault(require("../../../services/AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthController {
  async create(req, res) {
    const {
      email,
      password
    } = req.body; // Create a new instance of AuthenticateUserService

    const authenticateUserService = await _tsyringe.container.resolve(_AuthenticateUserService.default); // Execute the service using email and password given on req.body

    const {
      user,
      token
    } = await authenticateUserService.execute(email, password); // Return user and token

    return res.json((0, _classTransformer.classToClass)({
      user,
      token
    }));
  }

}

exports.default = AuthController;