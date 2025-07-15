const { poolPromise, config } = require("../../../config/sqldb.config");
const sql = require('mssql');

class CustomerRepository {

    async getAll() {
        const pool = await poolPromise;
        const result = await pool.request().execute('GetAllCustomers');
        return result.recordset;
    }

    async getById(id) {

        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('CustomerId', sql.Int, id)
                //.query('SELECT * FROM Customers WHERE CustomerId = @CustomerId');
                .execute('GetCustomerById');
            return result.recordset[0];
        } catch (err) {
            console.error('Repository Error:', err);
            throw err;
        }
    }

    async create(customer) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('FirstName', sql.NVarChar, customer.firstName)
            .input('LastName', sql.NVarChar, customer.lastName)
            .input('Email', sql.NVarChar, customer.email)
            .input('Phone', sql.NVarChar, customer.phone)
            .input('Address', sql.NVarChar, customer.address)
            .input('Password', sql.NVarChar, customer.password)
            .input('Role', sql.NVarChar, customer.role)
            .execute('CreateCustomer');
        return result.recordset[0];
    }

    async update(id, customer) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('Id', sql.Int, id)
            .input('FirstName', sql.NVarChar, customer.firstName)
            .input('LastName', sql.NVarChar, customer.lastName)
            .input('Email', sql.NVarChar, customer.email)
            .input('Phone', sql.NVarChar, customer.phone)
            .input('Address', sql.NVarChar, customer.address)
            .input('Password', sql.NVarChar, customer.password)
            .input('Role', sql.NVarChar, customer.role)
            .execute('UpdateCustomer');
        return result.rowsAffected;
    }

    async delete(id) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('Id', sql.Int, id)
            .execute('DeleteCustomer');
        return result.rowsAffected;
    }
}

module.exports = new CustomerRepository();