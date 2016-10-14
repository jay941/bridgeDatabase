var express = require('express'),
    router = express.Router();

//var db = require('../database/db');
db1 = require('../helper/connectdb.js');
var mongo = require('mongodb');
router.post('/', function(req, res) {
  var o_id = new mongo.ObjectID(req.body.key);
    var str = req.body.key;
    //var res1 = str.split("@", 1);
    var proName = str + "." + req.body.pro;
    console.log(proName);
    console.log(req.body.email);


    var db = db1.getDb().collection("userData");
    db.findOne({
         _id:  o_id,
        project: {
            "nameForDb": proName,
            "nameForUser": req.body.pro
        }
    }, function(err, existingUser) {
        if (existingUser) {
            console.log("found");
            console.log(existingUser);
            res.send('project is already available');
        } else {
            console.log("not found");
            db.update({
                _id:  o_id,
            }, {
                "$push": {
                    "project": {
                        "nameForDb": proName,
                        "nameForUser": req.body.pro
                    }
                }
            });
            db1.getDb().createCollection(proName, function(err, collection) {
                if (err) throw err;
                res.send('project is created successfully');
            });
        }
    });

});
module.exports = router;
