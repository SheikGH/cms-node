// File: src/infrastructure/repositories/customer.repository.js
const Customer = require('../../core/models/customer.model');
const redisClient = require('../../config/redis.config');

class CustomerRepository {
  async create(data) {
    const created = await Customer.create(data);
    await redisClient.del('customers');
    return created;
  }

  async findAll() {
    const cached = await redisClient.get('customers');
    if (cached) return JSON.parse(cached);
    const customers = await Customer.find();
    await redisClient.set('customers', JSON.stringify(customers));
    return customers;
  }

  async findById(id) {
    const cacheKey = `customer:${id}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);
    const customer = await Customer.findById(id);
    if (customer) await redisClient.set(cacheKey, JSON.stringify(customer));
    return customer;
  }

  async findByEmail(email) {
    return await Customer.findOne({ email });
  }

  async update(id, data) {
    const updated = await Customer.findByIdAndUpdate(id, data, { new: true });
    await redisClient.del('customers');
    await redisClient.del(`customer:${id}`);
    return updated;
  }

  async delete(id) {
    const deleted = await Customer.findByIdAndDelete(id);
    await redisClient.del('customers');
    await redisClient.del(`customer:${id}`);
    return deleted;
  }
}

module.exports = new CustomerRepository();