const sql = require('mssql');
const { executeStoredProcedure } = require("../../db/sql.helper");

class AuthRepository {

    async login(data) {
        return await executeStoredProcedure('spLogin', [
            { name: 'Email', type: sql.NVarChar, value: data.email },
            // { name: 'Password', type: sql.NVarChar, value: data.password },
          ]);
    }

    async register(data, hashedPassword) {
        return await executeStoredProcedure('spRegister', [
            { name: 'FirstName', type: sql.NVarChar, value: data.firstName },
            { name: 'LastName', type: sql.NVarChar, value: data.lastName },
            { name: 'Email', type: sql.NVarChar, value: data.email },
            { name: 'Phone', type: sql.NVarChar, value: data.phone },
            { name: 'Address', type: sql.NVarChar, value: data.address },
            { name: 'Password', type: sql.NVarChar, value: hashedPassword},
            { name: 'Role', type: sql.NVarChar, value: data.role },
          ]);
    }
}

module.exports = new AuthRepository();