const sql = require('mssql');
const config = require('../../config/db.config');

async function executeStoredProcedure(procedureName, inputParams = []) {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();

    inputParams.forEach(param => {
      request.input(param.name, param.type, param.value);
    });

    const result = await request.execute(procedureName);
    console.log('executeStoredProcedure::result:', result);
    return result.recordset || result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  executeStoredProcedure
};
