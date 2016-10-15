var express = require('express'),

    router = express.Router();
var db = require('../database/db');
var mongo = require('mongodb');

router.post('/', function(req, res) {
    var key = req.body.key;
    console.log(key);
    var o_id = new mongo.ObjectID(key);
    var db = db1.getDb().collection("userData");

    db.findOne({
        "_id": o_id
    }, function(err, existingUser) {
        if (err) {
            console.log(err);
        } else {
            // console.log(existingUser);
            res.send(existingUser.project);

        }

    });


});
module.exports = router;
