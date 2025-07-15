const AuthRepository = require("../../infrastructure/repositories/sql/auth.repository");
const CustomerDTO = require("../dtos/customer.dto");
const LoginDTO = require("../dtos/login.dto");

exports.login = async (data) => {
    const dto = new LoginDTO(data);
    const loginResults = await AuthRepository.login(dto);

    const login = loginResults[0]; // get first customer record
    // console.log('login::customer:', login, data, login?.Email == data.email, login?.Password == data.password);
    //bcrypt.compare(data.password, login.PasswordHash)
    if (login && login.Email === data.email && login.Password === data.password) {
        return { token: 'valid-token', login: login };
    } else {
        throw new Error('Invalid credentials');
    }
};

exports.register = async (data) => {
    const dto = new CustomerDTO(data);
    const registerResults = await AuthRepository.register(dto);
    const register = registerResults[0]; // get first customer record
    console.log('register::customer:', data, dto,register );
    return register;
}