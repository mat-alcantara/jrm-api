"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ShowSpecificCustomerService = _interopRequireDefault(require("../../../services/ShowSpecificCustomerService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CustomersController {
  async show(request, response) {
    const {
      id
    } = request.params;
    const showSpecificCustomersService = await _tsyringe.container.resolve(_ShowSpecificCustomerService.default);
    const specificCustomer = await showSpecificCustomersService.execute(id);
    return response.json(specificCustomer);
  }

}

exports.default = CustomersController;