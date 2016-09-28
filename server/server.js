var express = require('express');
var bodyParser = require('body-parser');
var jwt        = require("jsonwebtoken");
var morgan     = require("morgan");
var port = process.env.PORT || 8091;

var app = express();

var user = require('./controller/user');

app.use(bodyParser.json());
app.use(express.static('../client'));
app.use(morgan("dev"));
app.use(user);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.listen(port,function(){
	console.log('server running on port '+port);
})
