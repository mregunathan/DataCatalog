//YAML = require('yamljs');
//const http = require('http')
//const url = require('url')
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'DataCatalog',
    password: 'Pass1234*',
    port: 52072,
})


const result;
// Get All contract files from the Table
var getAllContracts = function() {
    pool.query('SELECT * FROM public."Contract"', (error, results) => {
        if (error) {
            throw error
        }
        result = results;
        //response.status(200).json(results.rows)
    })
    return result;
}

/*
const getAllContracts = (req, res) => {
    pool.query('SELECT * FROM public."Contract"', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}
*/

module.exports = {
    getAllContracts
}