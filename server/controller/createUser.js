var express = require('express'),
    router = express.Router();
    db1 = require('../helper/connectdb.js');
router.post('/', function(req, res) {

 console.log(req.body);

});
module.exports = router;