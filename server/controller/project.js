var express = require('express'),
    router = express.Router();
var db = require('../database/db');

router.post('/', function(req, res) {
  
    db.project.findOne({
        projectName: req.body.pro,
        key: req.body.key
    }, function(err, existingUser) {
        if (existingUser) {
            res.send('project is already available');
        } else {
            var user = new db.project({
                projectName: req.body.pro,
                key: req.body.key
            });
            user.save(function(err, result) {
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                } else {
                    db.project.findOne({
                        projectName: req.body.pro
                    }, function(err, existingUser) {
                        res.send("project successfully created");
                    });
                }
            });
        }
    });
});
module.exports = router;
