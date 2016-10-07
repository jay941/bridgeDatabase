var express = require('express');
router = express.Router();
var jsonfile = require('jsonfile');
var multiparty = require('multiparty');
var path1 = './fileUpload/uploadFile.json'
var upload = require('../helper/multerStorage.js');
var multiparty = require('multiparty');
var fs = require('fs');
var db = require('../database/db');

router.post('/', function(req, res) {


    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
<<<<<<< HEAD

        var data = fields;
        var name = data.key;
        var fname = files.file[0].originalFilename;
        var fpath = files.file[0].path;

        jsonfile.readFile(fpath, function(err, obj) {
            if (err) {
                console.log("Invalid file");
            } else {

                var filedata = obj;
                db.Database.findOne({
                    projectKey: data.key[0]
                }, function(err, jsonOfDb) {
                    if (jsonOfDb) {
                        //override data
                        jsonOfDb.projectKey = data.key[0];
                        jsonOfDb.data = obj;
                        jsonOfDb.save();

                    } else {
                        //save data directly
                        var jsonData = new db.Database({
                            projectKey: data.key[0],
                            data: filedata
                                //  data: obj.toString()
                        });
                        jsonData.save(function(err, result) {
                            if (err) {
                                res.status(500).send({
                                    message: err.message
                                });
                            } else {
                                db.Database.findOne({
                                    projectKey: data.key[0]
                                }, function(err, existingUser) {
                                    res.send("json saved successfully");
                                });
                            }
                        });
                    }
                })
            }

        }); //end of jsonfile.readFile()
    }); //end of form.parse()
}); //end of post

=======
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



});
>>>>>>> c9675d449df260c1f118b3843bee64a22485986e

module.exports = router;
