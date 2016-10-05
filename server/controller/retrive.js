var express = require('express'),
 router = express.Router();
var db = require('../database/db');
router.post('/', function(req, res) {
    var key = req.body.key;
    db.project.find({
        key: key
    }, function(err, projectRe) {
        if (err) {
            res.send('Error');
            //console.log(err);
        } else {
            res.send(projectRe);
        }
        console.log("print user");
        // res.send(user);
    })
});
module.exports=router;
