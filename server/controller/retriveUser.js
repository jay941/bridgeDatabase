var express = require('express'),

    router = express.Router();
var db1 = require('../helper/connectdb.js');
var mongo = require('mongodb');

router.post('/', function(req, res) {

/**Retriving new user data */
    var ProKey = req.body.ProKey;
    console.log('hi',ProKey)
    var db=db1.getDb().collection(ProKey);
    db.find({ProKey:ProKey}).toArray(function(err,result){
        if(!result){
        console.log('no data');
        }else{
            res.json(result);
        }

    })


});
module.exports = router;
