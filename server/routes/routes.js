var app = require('../server');
var express = require('express');
var scraperjs = require('scraperjs');

var router = express.Router();
var passport = require('passport');
var User = require('../models/userModel');



router.get('/auth', function(req, res){
  res.send('You reached the AUTH route!');
});


router.post('/login',
  function(req,res) {
    User.findOne({'email': req.body.email}, function(err, user) {
      if (user) {
        user.comparePassword(req.body.password, user.password, function(valid) {
          if (valid) {
            // var userToken = createToken(user);
            res.json({'success': true, 'loggedInID': user._id, 'loggedInUser': user.email });
          } else {
            res.sendStatus(401);
          }
        });
      } else {
        res.sendStatus(401);
      }
    });    
  }
);

router.post('/demographics',
  function(req,res){    
    console.log(req.body)
    
    res.send('hello');
    }
  );

router.post('/register',
  //send post data to database
  //save username and password to database
  function(req,res) {
    User.findOne({email: req.body.email}, function(err, user) {
      if (err) console.log(err);
      if (!user) {
        var newUser = new User({
          username: req.body.username,
          password: null,
          email: req.body.email,
          userData:[]
        });
        // hash password
        newUser.hashPassword(req.body.password,function(hash){
          newUser.password = hash;
          newUser.save(function(err,user){
            if (err) console.error(err);
            res.send({_id: user._id, userData: user.userData, username: user.username});
          })
        })
      } else {
        res.send('This account already exists');
      }
    });
  }
);

router.get('/logout', function(req,res) {
    req.logout();
    res.end();
  }
);

module.exports = router;