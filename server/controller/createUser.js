var express = require('express'),
    router = express.Router();
    db1 = require('../helper/connectdb.js');
router.post('/', function(req, res) {
console.log(req.body);
var db=db1.getDb.collection("userData");

});
module.exports = router;