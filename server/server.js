/**
 * Satellizer Node.js Example
 * (c) 2015 Sahat Yalkabov
 * License: MIT
 */

var path = require('path');
var qs = require('querystring');

var async = require('async');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var colors = require('colors');
var cors = require('cors');
var express = require('express');
var logger = require('morgan');
var jwt = require('jwt-simple');
var moment = require('moment');
var mongoose = require('mongoose');
var request = require('request');
var config = require('./config');
var jsonfile = require('jsonfile');
var multer  = require('multer');
var path1 = './fileUpload/raju.json'
var fileName = 'raju.json';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //  console.log(file);
        cb(null, './fileUpload/')
    },
    filename: function (req, file, cb) {
        cb(null, fileName)
    }
});
var upload = multer({ storage: storage }).single('file');

 //var file = './fileUpload/raju.json';
// jsonfile.readFile(file, function(err, obj) {
//     if (err) {
//         console.log("Invalid file");
//     } else {
//         console.log(obj);
//     }
//
// });

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        select: false
    },
    displayName: String,
    picture: String,
    bitbucket: String,
    facebook: String,
    foursquare: String,
    google: String,
    github: String,
    instagram: String,
    linkedin: String,
    live: String,
    yahoo: String,
    twitter: String,
    twitch: String,
    spotify: String
});
var project = mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    //  password:{type:String,required:true}
});


userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};
var project = mongoose.model('project', project);
var User = mongoose.model('User', userSchema);

mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', function(err) {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

var app = express();

app.set('port', process.env.NODE_PORT || 3002);
app.set('host', process.env.NODE_IP || 'localhost');
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Force HTTPS on Heroku
if (app.get('env') === 'production') {
    app.use(function(req, res, next) {
        var protocol = req.get('x-forwarded-proto');
        protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });
}
app.use(express.static(path.join(__dirname, '../client')));

/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
function ensureAuthenticated(req, res, next) {
    if (!req.header('Authorization')) {
        return res.status(401).send({
            message: 'Please make sure your request has an Authorization header'
        });
    }
    var token = req.header('Authorization').split(' ')[1];

    var payload = null;
    try {
        payload = jwt.decode(token, config.TOKEN_SECRET);
    } catch (err) {
        return res.status(401).send({
            message: err.message
        });
    }

    if (payload.exp <= moment().unix()) {
        return res.status(401).send({
            message: 'Token has expired'
        });
    }
    req.user = payload.sub;
    next();
}

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createJWT(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
}

/*
 |--------------------------------------------------------------------------
 | GET /api/me
 |--------------------------------------------------------------------------
 */
app.get('/api/me', ensureAuthenticated, function(req, res) {
    User.findById(req.user, function(err, user) {
        res.send(user);
    });
});

/*
 |--------------------------------------------------------------------------
 | PUT /api/me
 |--------------------------------------------------------------------------
 */
app.put('/api/me', ensureAuthenticated, function(req, res) {
    User.findById(req.user, function(err, user) {
        if (!user) {
            return res.status(400).send({
                message: 'User not found'
            });
        }
        user.displayName = req.body.displayName || user.displayName;
        user.email = req.body.email || user.email;
        user.save(function(err) {
            res.status(200).end();
        });
    });
});


/*
 |--------------------------------------------------------------------------
 | Log in with Email
 |--------------------------------------------------------------------------
 */
app.post('/auth/login', function(req, res) {
    User.findOne({
        email: req.body.email
    }, '+password', function(err, user) {
        if (!user) {
            return res.status(401).send({
                message: 'Invalid email and/or password'
            });
        } else {
            // res.send(user)
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (!isMatch) {
                    return res.status(401).send({
                        message: 'Invalid email and/or password'
                    });
                }
                res.send({
                    user: user,
                    token: createJWT(user)
                });
            });
        }

    });
});

/*
 |--------------------------------------------------------------------------
 | Create Email and Password Account
 |--------------------------------------------------------------------------
 */
app.post('/auth/signup', function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, existingUser) {
        if (existingUser) {
            res.status(409).send({
                message: 'Email is already taken'
            });
        } else {
            var user = new User({
                displayName: req.body.displayName,
                email: req.body.email,
                password: req.body.password
            });
            user.save(function(err, result) {
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                } else {
                    User.findOne({
                        email: req.body.email
                    }, function(err, existingUser) {
                        res.send({
                            existingUser: existingUser,
                            token: createJWT(result)
                        });
                    });
                }

            });
        }

    });
});

/*
 |--------------------------------------------------------------------------
 |Stroring project detail
 |--------------------------------------------------------------------------
 */
app.post('/project', function(req, res) {
    console.log(req.body);
    var projectName = req.body.pro;
    var key = req.body.key;
    //	var password=req.body.password;
    console.log('projectName', projectName, key);

    var data = new project({
        projectName: projectName,
        key: key
    });
    console.log('projectcreated', projectName);
    data.save(function(err, user) {
        if (err) {
            res.send('project already available');
            //console.log(err);
        } else {
            project.find(function(err, result) {
                if (err) {
                    res.send('data not prasent');
                } else {
                    res.send("saved");
                }

            })
            console.log("print user");
            // res.send(user);

        }
    })

});

/*
 |--------------------------------------------------------------------------
 | Add project detail to mongodb
 |--------------------------------------------------------------------------
 */
 //app.post('/fileUpload', upload);
app.post('/fileUpload', function(req,res) {
  //console.log("in server"+req.files);
  upload(req,res,function(err) {
 if(err) {
   console.log("error");
   res.end("Error uploading file.");
 }
 console.log("suceess");
 console.log(req.files);
 jsonfile.readFile(path1, function(err, obj) {
     if (err) {
         console.log("Invalid file");
     } else {
       console.log("reading json file");
         console.log(obj);
     }

 });
 res.end("File is uploaded successfully!");
   });
});

/*
 |--------------------------------------------------------------------------
 | Retriving project detail from mongo
 |--------------------------------------------------------------------------
 */
app.post('/retrive', function(req, res) {
    var key = req.body.key;
    project.find({
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
/*
 |--------------------------------------------------------------------------
 | Login with Google
 |--------------------------------------------------------------------------
 */
app.post('/auth/google', function(req, res) {
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.GOOGLE_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, {
        json: true,
        form: params
    }, function(err, response, token) {
        var accessToken = token.access_token;
        var headers = {
            Authorization: 'Bearer ' + accessToken
        };

        // Step 2. Retrieve profile information about the current user.
        request.get({
            url: peopleApiUrl,
            headers: headers,
            json: true
        }, function(err, response, profile) {
            if (profile.error) {
                return res.status(500).send({
                    message: profile.error.message
                });
            }
            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                User.findOne({
                    google: profile.sub
                }, function(err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({
                            message: 'There is already a Google account that belongs to you'
                        });
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.TOKEN_SECRET);
                    User.findById(payload.sub, function(err, user) {
                        if (!user) {
                            return res.status(400).send({
                                message: 'User not found'
                            });
                        }
                        user.google = profile.sub;
                        user.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
                        user.displayName = user.displayName || profile.name;
                        user.save(function() {
                            var token = createJWT(user);
                            res.send({
                                token: token
                            });
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({
                    google: profile.sub
                }, function(err, existingUser) {
                    if (existingUser) {
                        return res.send({
                            existingUser: existingUser,
                            token: createJWT(existingUser)
                        });
                    }
                    var user = new User();
                    user.google = profile.sub;
                    user.picture = profile.picture.replace('sz=50', 'sz=200');
                    user.displayName = profile.name;
                    user.save(function(err) {
                        var token = createJWT(user);

                        res.send({
                            existingUser: existingUser,
                            token: token
                        });

                    });
                });
            }
        });
    });
});
/*
 |--------------------------------------------------------------------------
 | Start the Server
 |--------------------------------------------------------------------------
 */
app.listen(app.get('port'), app.get('host'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
