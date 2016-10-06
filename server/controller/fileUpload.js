var express = require('express');
router = express.Router();
var jsonfile = require('jsonfile');
var multiparty = require('multiparty');
var path1 = './fileUpload/uploadFile.json'
var upload = require('../helper/multerStorage.js');
var multiparty = require('multiparty');

router.post('/', function(req, res) {

    console.log(req);

    var form = new multiparty.Form();
 
    form.parse(req, function(err, fields, files) {
     console.log('files',files);
    });
    // console.log("in server" + req.files);
    // upload(req, res, function(err) {
    //     if (err) {
    //         console.log("error");
    //         res.end("Error uploading file.");
    //     }
    //     console.log("suceess");
    //     console.log(req.files);
    //     jsonfile.readFile(path1, function(err, obj) {
    //         if (err) {
    //             console.log("Invalid file");
    //         } else {
    //             console.log("reading json file");
    //             console.log(obj);
    //         }

    //     });
    //     res.end("File is uploaded successfully!");
    // });

  console.log(req.body);
  var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
      console.log('files',files);
      console.log('fields',fields);
    });
  

});

module.exports = router;
