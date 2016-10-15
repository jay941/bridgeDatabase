var express = require('express'),

    router = express.Router();
var db1 = require('../helper/connectdb.js');
var mongo = require('mongodb');

router.post('/', function(req, res) {

    /**Retriving project  */
    var key = req.body.key;
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
