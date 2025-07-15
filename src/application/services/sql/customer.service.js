const customerRepo = require("../../../infrastructure/repositories/sql/customer.repository");
const CustomerDTO = require("../../dtos/customer.dto");
const bcrypt = require('bcryptjs');

exports.getAll = async () => {
    return await customerRepo.getAll();
}

exports.getById = async (id) => {
    return await customerRepo.getById(id);
}

exports.create = async (data) => {
    const dto = new CustomerDTO(data);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await customerRepo.create(dto, hashedPassword);
}

exports.update = async (id, data) => {
    const dto = new CustomerDTO(data);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await customerRepo.update(id, dto, hashedPassword);
}
exports.delete = async (id) => {
    return await customerRepo.delete(id);
}

exports.search = async (term) => {
    return await customerRepo.search(term);
}
