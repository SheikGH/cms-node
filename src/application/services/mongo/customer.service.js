// File: src/services/customer.service.js
const CustomerDTO = require('../../dtos/customer.dto');
const customerRepo = require('../../../infrastructure/repositories/mongo/customer.repository');

class CustomerService {

  async getAll() {
    return await customerRepo.findAll();
  }

  async getById(id) {
    return await customerRepo.findById(id);
  }

  async create(data) {
    const dto = new CustomerDTO(data);
    return await customerRepo.create(dto);
  }

  async update(id, data) {
    const dto = new CustomerDTO(data);
    return await customerRepo.update(id, dto);
  }

  async delete(id) {
    return await customerRepo.delete(id);
  }

  async search(term) {
    return customerRepo.search(term);
  };
}

module.exports = new CustomerService();