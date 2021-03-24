"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Customer = _interopRequireDefault(require("../../infra/typeorm/entities/Customer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeCustomerRepository {
  constructor() {
    this.customersCreated = void 0;
    this.customersCreated = [];
  } // Create a new Customer


  async createCustomer(customerData) {
    const customer = new _Customer.default();
    Object.assign(customer, {
      id: (0, _uuid.v4)()
    }, customerData);
    this.customersCreated.push(customer);
    return customer;
  } // Delete a customer by id


  async deleteCustomerById(id) {
    const customersWithDifferentId = this.customersCreated.filter(customer => customer.id !== id);
    this.customersCreated = customersWithDifferentId;
  } // Find a customer by id


  async findCustomerById(id) {
    const customerFound = await this.customersCreated.find(customer => customer.id === id);
    return customerFound;
  } // Show all customers


  async showAllCustomers() {
    return this.customersCreated;
  } // Update a customer


  async updateCustomer(customer, data) {
    // Create an updated customer
    const updatedCustomer = { ...customer,
      ...data
    }; // Delete old customer from database

    await this.customersCreated.splice(this.customersCreated.indexOf(customer), 1); // Add new customer to database

    await this.customersCreated.push(updatedCustomer);
    return updatedCustomer;
  }

}

exports.default = FakeCustomerRepository;