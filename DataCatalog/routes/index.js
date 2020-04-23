'use strict';
var express = require('express');
var router = express.Router();
const http = require('http');
const url = require('url');
var logic = require('../services/logic');

/* Default get request */
router.get('/', function (req, res) {
    res.json({ info: 'Data Catalog - API' });
});

// Browse API Endpoint
router.get('/catalog', async function (req, res) {
    try {
        await logic.getAllContracts().then((result) => { res.status(200).json({ "message": "success", result }) });
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// Search API Endpoint
router.get('/catalog/search', async function (req, res) {
    try {
        var searchString = url.parse(req.url, true).query.text
        await logic.getContractsWithSearchString(searchString).then((result) => { res.status(200).json({ "message": "success", result }) });
    }
    catch (err) {
        res.status(500).send(err);
    }
});

//Add File API Endpoint
router.post('/catalog/addfile', async function (req, res) {
    try {
        if (!req.files) {
            res.json({ "message": "No file uploaded" });
        } else {
            var yamlFile = req.files.yamlFile;
            await logic.addYamlToDB(yamlFile.name, yamlFile.data.toString()).then((result) => {
                if (result == 1) {
                    res.json({ "message": "File is successfully updated in DB" });
                }
                else {
                    res.json({ "message": "File is successfully uploaded in DB" });
                }                
            });           
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


module.exports = router;
