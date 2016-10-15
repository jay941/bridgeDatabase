var express = require('express'),
    router = express.Router();
db1 = require('../helper/connectdb.js');
var bcrypt = require('bcrypt');
// Create a password salt
var salt = bcrypt.genSaltSync(10);


//post call for storing new user
router.post('/', function (req, res) {
    console.log("call",req.body.ProKey);
    var ProKey = req.body.ProKey;
    var db = db1.getDb().collection(ProKey);
    console.log(db)
      var Uid = bcrypt.hashSync(req.body.email, salt);
    db.findOne({ email: req.body.email},function (err, user) {
        if (!user) {
            db.insert({
                email: req.body.email, password: req.body.password,
                ProKey:ProKey, date: req.body.date,Uid:Uid
            }, function (err, save) {
                if (err) {
                    res.send("Something going wrong");
                } else {
                    db.find().toArray(function(err,result){
                        if(result){
                            res.json(result)
                        }else{
                            res.send("errr")
                        }
                    })
                }

            });

        }
        else {
            res.send("User allready prasent");
        }
    })
});
module.exports = router;