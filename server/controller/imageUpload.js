var express = require('express');
router = express.Router();
var multiparty = require('multiparty');
var upload = require('../helper/multerStorage.js');
var fs = require('fs');
var db = require('../database/db');

router.post('/', function(req, res) {


    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        var data = fields;
        var name = data.key;
       console.log('fields',name,'files',files);
       
    }); //end of form.parse()
}); //end of post




module.exports = router;
