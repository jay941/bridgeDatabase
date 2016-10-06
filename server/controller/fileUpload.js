var express = require('express');
router = express.Router();
var jsonfile = require('jsonfile');
var path1 = './fileUpload/uploadFile.json'
var upload = require('../helper/multerStorage.js');
var multiparty = require('multiparty');

router.post('/', function(req, res) {
  console.log(req.body);
  var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
      console.log('files',files);
      console.log('fields',fields);
    });
  
});

module.exports = router;
