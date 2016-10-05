var express = require('express');
router = express.Router();
var jsonfile = require('jsonfile');
var path1 = './fileUpload/uploadFile.json'
var upload = require('../helper/multerStorage.js');


router.post('/', function(req, res) {
    console.log("in server" + req.files);
    upload(req, res, function(err) {
        if (err) {
            console.log("error");
            res.end("Error uploading file.");
        }
        console.log("suceess");
        console.log(req.files);
        jsonfile.readFile(path1, function(err, obj) {
            if (err) {
                console.log("Invalid file");
            } else {
                console.log("reading json file");
                console.log(obj);
            }

        });
        res.end("File is uploaded successfully!");
    });
});

module.exports = router;
