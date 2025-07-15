const AuthRepository = require("../../../infrastructure/repositories/sql/auth.repository");
const customerRepository = require('../../../infrastructure/repositories/sql/customer.repository');
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

  async register(data,hashedPassword) {
    const dto = new CustomerDTO(data);
    await AuthRepository.register(dto, hashedPassword);
  }
  // async login(data) {
  //   try {
  //     const dto = new LoginDTO(data);
  //     const customer = await AuthRepository.login(dto);
  //     // const customer = result.recordset[0];
  //     if (!customer) return res.status(400).json({ message: 'Invalid credentials' });

  //     const match = await bcrypt.compare(data.password, customer.password);
  //     if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  //     const token = createToken(customer);
  //     res.json({ token: token, username: customer.email, role: customer.role });
  //   } catch (err) {
  //     res.status(500).json({ message: 'Login error', error: err });
  //   }
  // }

  // async register(data) {
  //   const { name, email, password, role } = req.body;
  //   try {
  //     const check = await AuthRepository.login(dto);
  //     if (check.recordset.length > 0) return res.status(400).json({ message: 'User already exists' });
  
  //     const hashedPassword = await bcrypt.hash(data.password, 10);
  //     const dto = new CustomerDTO(data);
  //     const registerResults = await AuthRepository.register(dto, hashedPassword);
  //     console.log('register::customer:', data, dto, registerResults);
  //     res.status(201).json({ message: 'User registered' });
  //   } catch (err) {
  //     res.status(500).json({ message: 'Registration error', error: err });
  //   }
  // }
}

module.exports = new AuthService();

