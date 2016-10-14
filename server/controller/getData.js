var express = require('express'),
    router = express.Router();
// var db = require('../database/db');
db = require('../helper/connectdb.js');
router.post('/', function(req, res) {
    var projectKey = req.body.key;
    console.log("getdata key "+projectKey);
    var coll = db1.getDb().collection(projectKey);
    // Cursor has an to array method that reads in all the records to memory
        coll.find().toArray(function(err, docs) {
          console.log("Printing docs from Array")
          docs.forEach(function(doc) {
            console.log("Doc from Array ");
            console.log(doc);
          });
        });

});
module.exports = router;
// db.Database.findOne({
//     projectKey: projectKey
// }, function(err, jsonOfDb) {
//     //if project has already some data then override it
//     if (err) {
//         res.send('Error');
//         //console.log(err);
//     } else {
//         console.log("json obj "+jsonOfDb.data);
//         res.send(jsonOfDb);
//     }
// });
