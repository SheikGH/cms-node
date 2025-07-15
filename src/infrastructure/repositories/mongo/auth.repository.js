const Auth = require('../../db/models/auth.model');
const Customer = require('../../db/models/customer.model');

class AuthRepository {
    async login(data) {
        return await Customer.findOne({ 'email': data.email });
    }
    async register(data) {
        //return await Customer.create(data);
        const customer = new Customer(data);
        await customer.save();
    }
}

module.exports = new AuthRepository();