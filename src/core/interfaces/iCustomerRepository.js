class ICustomerRepository{
    getAll(){};
    getById(id){};
    create(customerDTO) {}
    update(id, customerDTO) {}
    delete(id) {}
}

module.exports = ICustomerRepository;