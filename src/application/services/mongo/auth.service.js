const AuthRepository = require("../../../infrastructure/repositories/mongo/auth.repository");
const customerRepository = require('../../../infrastructure/repositories/mongo/customer.repository');
const CustomerDTO = require("../../dtos/customer.dto");
const LoginDTO = require("../../dtos/login.dto");

class AuthService {

  async login(data) {
    try {
      const dto = new LoginDTO(data);
      const customer = await AuthRepository.login(dto);
      return customer;
    } catch (err) {
      throw new Error('Invalid credentials');
    }
  }

  async register(data) {
    const dto = new CustomerDTO(data);
    await AuthRepository.register(dto);
  }
}

module.exports = new AuthService();

