const customers = [{ customerId: 1, 'firstName': 'John', 'lastName': 'Doe', 'email': 'john.doe@example.com', 'phone': '1234567890', 'address': '123 Main St' }, { customerId: 2, 'firstName': 'Jane', 'lastName': 'Smith', 'email': 'jane.smith@example.com', 'phone': '0987654321', 'address': '456 Elm St' }, { customerId: 3, 'firstName': 'Leanne', 'lastName': 'Graham', 'email': 'Sincere@example.com', 'phone': '17707368031', 'address': 'Kulas Light' }, { customerId: 4, 'firstName': 'Dennis', 'lastName': 'Schulist', 'email': 'dennis@example.com', 'phone': '098-765-4321', 'address': 'Suite 879' }, { customerId: 5, 'firstName': 'Glenna', 'lastName': 'Reichert', 'email': 'glenna@example.com', 'phone': '123-456-7890', 'address': 'Proactive didactic contingency' }, { customerId: 6, 'firstName': 'Ervin', 'lastName': 'Howell', 'email': 'ervin@example.com', 'phone': '0987654321', 'address': 'Wisokyburgh' }]; // Simulate DB
exports.getAll = async () => customers;

exports.getById = async (id) => {
    const customer = customers.find(c => c.customerId == id);
    if (!customer) throw new Error('Customer not found');
    return customer;
}

exports.create = async (data) => {
    const customerId = customers.length + 1;
    console.log('create:',data);
    const newCustomer = { customerId, ...data };
    customers.push(newCustomer);
    return newCustomer;
}

exports.update = async (id, data) => {
    const index = customers.findIndex(c => c.customerId == id);
    if (index === -1) throw new Error('Customer not found');
    customers[index] = { ...customers[index], ...data }
    return customers[index];
}
exports.delete = async (id) => {
    const index = customers.findIndex(c => c.customerId == id);
    if (index === -1) throw new Error('Customer not found');
    const deletedCustomers = customers.filter(c => c.customerId != id);
    return customers.splice(index, 1);
}

