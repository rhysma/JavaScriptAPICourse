var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Member = require('../member/Member');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var VerifyToken = require('./VerifyToken');

//router section
//register a new user
router.post('/register', function(req, res) {
  
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    Member.create({
      name : req.body.username,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, member) {
      if (err) return res.status(500).send("There was a problem registering the member.")
      // create a token
      var token = jwt.sign({ id: member._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }); 
  });

  //get the user id back based on the token from the register endpoint
  router.get('/me', VerifyToken, function(req, res, next) {

    Member.findById(req.userId, { password: 0 }, function (err, member) {
      if (err) return res.status(500).send("There was a problem finding the member.");
      if (!member) return res.status(404).send("No member found.");
      
      res.status(200).send(member);
        
    });
  });


//log in router
router.post('/login', function(req, res) {

    Member.findOne({ email: req.body.email }, function (err, member) {
      if (err) return res.status(500).send('Error on the server.');
      if (!member) return res.status(404).send('No member found.');
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, member.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
      var token = jwt.sign({ id: member._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      res.status(200).send({ auth: true, token: token });
    });
    
  });

  module.exports = router;
