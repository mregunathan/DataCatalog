var YAML = require('yamljs');
const db = require('../respository/dbaccess')


// Get All contract files from the Table
async function getAllContracts()
{
    results = await db.getAllContracts();
    return results;
}

// Get the contract files from the Table that matches the searchString
async function getContractsWithSearchString(searchString) {
    results = await db.getContractsWithSearchString(searchString);

    return results;
}

// Function to convert yaml string to JSON object
function YAMLtoJSON(yamlStr) {
    return YAML.parse(yamlStr);
}

// Function to convert json string to aml string
function JSONtoYaml(jsonStr) {
    var obj = JSON.parse(jsonStr);
    var yamlStr = YAML.stringify(obj);
    return yamlStr;
}

// Add Yaml file to DB
async function addYamlToDB(name, yamlFile){
    const yamlFileToJSON = YAMLtoJSON(yamlFile);
    const jsonStr = JSON.stringify(yamlFileToJSON);
    const entityName = yamlFileToJSON.Entity.Name;
    const entityDescription = yamlFileToJSON.Entity.Description;
    var result = await db.addYamlToDB(name, entityName, entityDescription, yamlFileToJSON);

    return result;
}

module.exports = {
    getAllContracts: getAllContracts,
    getContractsWithSearchString: getContractsWithSearchString,
    addYamlToDB: addYamlToDB
};