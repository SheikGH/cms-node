const AuthRepository = require("../../infrastructure/repositories/mongo/auth.repository");
const customerRepository = require('../../infrastructure/repositories/mongo/customer.repository');
const CustomerDTO = require("../dtos/customer.dto");
const LoginDTO = require("../dtos/login.dto");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

class AuthService {

  async login(data) {
    const dto = new LoginDTO(data);
    console.log('AuthService:login::', data, dto);
    const customer = await AuthRepository.login(dto);
    console.log('AuthService:login::', data, dto, customer);
    //bcrypt.compare(data.password, login.PasswordHash)
    if (customer && customer.email === data.email && customer.password === data.password) {
      const token = createToken(customer);
      return { token: token, username: customer.email, role : customer.role };
    } else {
      throw new Error('Invalid credentials');
    }
    // const isMatch = await bcrypt.compare(password, customer.password);
    // if (!isMatch) throw new Error('Invalid email or password');
    return { token, customer };
  }

  async register(data) {
    const dto = new CustomerDTO(data);
    const registerResults = await AuthRepository.register(dto);
    const register = registerResults[0]; // get first customer record
    console.log('register::customer:', data, dto, register);
    return register;

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const customer = await customerRepository.create({ ...data, password: hashedPassword });
    return customer;
  }
}
const createToken = (customer) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ username: customer.email, role: customer.role }, jwtSecret, {
      expiresIn: '1h',
    });
    return token;
  }
  catch (err) {
    console.error('Error in create token', err);
  }

}
module.exports = new AuthService();

