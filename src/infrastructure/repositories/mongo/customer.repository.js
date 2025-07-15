// File: src/infrastructure/repositories/customer.repository.js
const CustomerModel = require('../../db/models/customer.model');

class CustomerRepository {

  constructor(customerModel) {
    this.customerModel = customerModel;
  }

  async create(data) {
    // return await this.customerModel.create(data);
    const customer = new this.customerModel(data);
    await customer.save();
  }

  async findAll() {
    return await this.customerModel.find();
  }

  async findById(id) {
    return await this.customerModel.findById(id);
  }

  async findByEmail(email) {
    return await this.customerModel.findOne({ email });
  }
  
  async update(id, data) {
    return await this.customerModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await this.customerModel.findByIdAndDelete(id);
  }
 
  async search (searchTerm) {
    const regex = new RegExp(searchTerm, 'i'); // i = case-insensitive
    return await this.customerModel.find({
      $or: [
        { customerId: regex },
        { firstName: regex },
        { lastName: regex },
        { email: regex },
        { phone: regex },
        { address: regex },
        { role: regex }
      ]
    });
  };
}

module.exports = new CustomerRepository(CustomerModel);
