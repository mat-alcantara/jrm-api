"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {
  // Create a new user using the CreateUserService
  async create(request, response) {
    const {
      name,
      email,
      password,
      userType
    } = request.body; // Inject dependencies on service and create it

    const createUserService = _tsyringe.container.resolve(_CreateUserService.default);

    const user = await createUserService.execute({
      name,
      email,
      password,
      userType
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UserController;