var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var request = require('request');
var security = require('../security/security');
var persons = require('../model/sampledata/guests.json');

/* GET home page. */
router.get('/', function (req, res) {
    res.redirect("app/index.html")
});

router.get('/random', function(req, res) {
    var array = persons;
    var randomperson = array[Math.floor(Math.random()*array.length)];
    res.json(randomperson);
});

router.post('/authenticate', function (req, res) {

    var profile;

    // removed hashing the password before validating, because we have test passwords that are non hashed for testing.
    //request.post({url: 'http://localhost:5000/login', body: {username: req.body.username, password: security.hash(req.body.password)}, json: true},
    request.post({url: 'http://localhost:5000/login', body: {username: req.body.username, password: req.body.password}, json: true},
        function callback(err, httpResponse, body) {
            if  (err) {
                console.log(err);
                res.status(500).end('Something broke');
            } else {
                // Request was a success, body should contain obj with obj_id, role, user and pw if statuscode is 200
                if(httpResponse.statusCode == '200') {
                    profile = body;
                    switch (profile.role) {
                        case 'admin':
                            // We are sending the profile inside the token
                            var token = jwt.sign(profile, require("../security/secrets").secretTokenAdmin, {expiresInMinutes: 60 * 5});
                            res.json({token: token});
                            break;
                        case 'superadmin':
                            var token = jwt.sign(profile, require("../security/secrets").secretTokenSuperAdmin, {expiresInMinutes: 60 * 5});
                            res.json({token: token});
                            break;
                        case 'user':
                            var token = jwt.sign(profile, require("../security/secrets").secretTokenUser, {expiresInMinutes: 60 * 5});
                            res.json({token: token});
                            break;
                    }
                } else {
                    res.status(401).end('Wrong user or password');
                }
            }
        });
});


module.exports = router;
