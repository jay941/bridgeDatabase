var express = require('express'),

    router = express.Router();
var db = require('../database/db');
router.post('/', function(req, res) {
    var key = req.body.key;
    var db = db1.getDb().collection("userData");
      db.findOne({
          email: req.body.email
      }, function(err, existingUser) {
        console.log(existingUser);
        res.send(existingUser);
        
      });
    
});
module.exports = router;
