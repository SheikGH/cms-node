const sql = require('mssql');
const { executeStoredProcedure } = require("../../db/sql.helper");

class CustomerRepository {

    async getAll() {
        return await executeStoredProcedure('spGetAllCustomers');
    }

    async getById(id) {
        return await executeStoredProcedure('spGetCustomerById', [
            { name: 'CustomerId', type: sql.Int, value: id },
        ]);
    }
    async create(customer, hashedPassword) {
        return await executeStoredProcedure('spCreateCustomer', [
            { name: 'FirstName', type: sql.NVarChar, value: customer.firstName },
            { name: 'LastName', type: sql.NVarChar, value: customer.lastName },
            { name: 'Email', type: sql.NVarChar, value: customer.email },
            { name: 'Phone', type: sql.NVarChar, value: customer.phone },
            { name: 'Address', type: sql.NVarChar, value: customer.address },
            { name: 'Password', type: sql.NVarChar, value: hashedPassword },
            { name: 'Role', type: sql.NVarChar, value: customer.role },
        ]);
    }

    async update(id, customer, hashedPassword) {
        return await executeStoredProcedure('spUpdateCustomer', [
            { name: 'CustomerId', type: sql.Int, value: id },
            { name: 'FirstName', type: sql.NVarChar, value: customer.firstName },
            { name: 'LastName', type: sql.NVarChar, value: customer.lastName },
            { name: 'Email', type: sql.NVarChar, value: customer.email },
            { name: 'Phone', type: sql.NVarChar, value: customer.phone },
            { name: 'Address', type: sql.NVarChar, value: customer.address },
            { name: 'Password', type: sql.NVarChar, value: hashedPassword },
            { name: 'Role', type: sql.NVarChar, value: customer.role },
        ]);
    }

    async delete(id) {
        return await executeStoredProcedure('spDeleteCustomer', [
            { name: 'CustomerId', type: sql.Int, value: id },
        ]);
    }

    async search(searchTerm) {
        return await executeStoredProcedure('spSearch', [
            { name: 'Search', type: sql.NVarChar, value: searchTerm },
        ]);
    }
}

module.exports = new CustomerRepository();