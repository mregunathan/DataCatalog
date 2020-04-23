const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'DataCatalog',
    password: 'newpassword',
    port: 5432
});

// Get All contract files from the Table
async function getAllContracts() {
    results = await pool.query("SELECT * FROM public.contract;");
    return results.rows;
}

// Get the contract files from the Table that matches the searchString
async function getContractsWithSearchString(searchString) {
    results = await pool.query("SELECT * FROM public.contract WHERE to_tsvector(content::text) @@ plainto_tsquery($1); ", [searchString]);

    return results.rows;
}

// Add Yaml file to DB
async function addYamlToDB(name, entityName, entityDescription, yamlFileToJSON) {

    result = await pool.query("UPDATE public.contract SET entity_name = $2, description = $3, content = $4 WHERE file_name = $1; ", [name, entityName, entityDescription, yamlFileToJSON]);

    if (result.rowCount > 0) {
        return 1;
    }
    else {
        await pool.query("INSERT INTO public.contract(file_name, entity_name, description, content) VALUES($1, $2, $3, $4);", [name, entityName, entityDescription, yamlFileToJSON]);
        return 2;
    }
}

module.exports = {
    getAllContracts: getAllContracts,
    getContractsWithSearchString: getContractsWithSearchString,
    addYamlToDB: addYamlToDB
};