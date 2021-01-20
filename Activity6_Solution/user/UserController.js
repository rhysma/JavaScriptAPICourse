var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');

//routers 
// CREATES A NEW USER
// router.post('/', function (req, res) {
//     User.create({
//             username : req.body.username,
//             password : req.body.password
//         }, 
//         function (err, user) {
//             if (err) return res.status(500).send("There was a problem adding the information to the database.");
//             res.status(200).send(user);
//         });
// });

//gets all members in the database
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

//gets a single member from the database by id
router.get('/:id', function (req, res) {
    Users.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!member) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

//updates a single member in the database
router.put('/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

//deletes a single member in the database
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.username +" was deleted.");
    });
});

module.exports = router;