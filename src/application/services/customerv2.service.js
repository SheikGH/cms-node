const customerRepo = require("../../infrastructure/repositories/sql/customer.repository");
const CustomerDTO = require("../dtos/customer.dto");

exports.getAll = async () => {
    return await customerRepo.getAll();
}

exports.getById = async (id) => {
    return await customerRepo.getById(id);
}

exports.create = async (data) => {
    const dto = new CustomerDTO(data);
    return await customerRepo.create(dto);
}

exports.update = async (id, data) => {
    const dto = new CustomerDTO(data);
    return await customerRepo.update(id,dto);
}
exports.delete = async (id) => {
    return await customerRepo.delete(id);
}

