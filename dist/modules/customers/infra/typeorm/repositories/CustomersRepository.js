"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Customer = _interopRequireDefault(require("../entities/Customer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CustomerRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Customer.default);
  }

  async createCustomer(data) {
    const customer = await this.ormRepository.create(data);
    this.ormRepository.save(customer);
    return customer;
  }

  async deleteCustomerById(id) {
    await this.ormRepository.delete(id);
  }

  async findCustomerById(id) {
    const customerFoundById = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return customerFoundById;
  }

  async showAllCustomers() {
    const allCustomers = await this.ormRepository.find();
    return allCustomers;
  }

  async updateCustomer(customer, data) {
    const userUpdated = this.ormRepository.save({ ...customer,
      ...data
    });
    return userUpdated;
  }

}

exports.default = CustomerRepository;