"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateCustomerService = _interopRequireDefault(require("../../../services/CreateCustomerService"));

var _DeleteCustomerService = _interopRequireDefault(require("../../../services/DeleteCustomerService"));

var _ShowAllCustomersService = _interopRequireDefault(require("../../../services/ShowAllCustomersService"));

var _UpdateCustomerService = _interopRequireDefault(require("../../../services/UpdateCustomerService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CustomersController {
  async show(request, response) {
    const showAllCustomersService = await _tsyringe.container.resolve(_ShowAllCustomersService.default);
    const allCustomers = await showAllCustomersService.execute();
    return response.json(allCustomers);
  }

  async create(request, response) {
    // Load CreateCustomersService with dependency injection
    const createCustomerService = _tsyringe.container.resolve(_CreateCustomerService.default);

    const {
      name,
      email,
      telephone,
      area,
      city,
      state
    } = request.body;
    const customerCreated = await createCustomerService.execute({
      name,
      email,
      telephone,
      area,
      city,
      state
    });
    return response.json(customerCreated);
  }

  async delete(request, response) {
    const {
      id
    } = request.body;
    const deleteCustomerService = await _tsyringe.container.resolve(_DeleteCustomerService.default);
    await deleteCustomerService.execute(id);
    return response.status(200).json();
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const data = request.body;
    const updateCustomerService = await _tsyringe.container.resolve(_UpdateCustomerService.default);
    const customerUpdated = await updateCustomerService.execute(id, data);
    return response.json(customerUpdated);
  }

}

exports.default = CustomersController;