var express = require('express');
router = express.Router();
var jsonfile = require('jsonfile');
var path1 = './fileUpload/uploadFile.json'
var upload = require('../helper/multerStorage.js');
var multiparty = require('multiparty');

router.post('/', function(req, res) {
    console.log(req.bod);
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
        console.log('files', files);
        console.log('fields', fields);
    });
    form.on('part', function(part) {
            // You *must* act on the part by reading it
            // note: if you want to ignore it, just call "part.resume()"

            if (!part.filename) {
                // filename is not defined when this is a field and not a file
                console.log('got field named ' + part.name);
                // ignore field's content
                part.resume();
            }

            if (part.filename) {
                // filename is defined when this is a file
                count++;
                console.log('got file named ' + part.name);
                // ignore file's content here
                part.resume();
            }

            part.on('error', function(err) {
                // decide what to do
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
    //
    //     });
    //     res.end("File is uploaded successfully!");
    // });
});

module.exports = router;
