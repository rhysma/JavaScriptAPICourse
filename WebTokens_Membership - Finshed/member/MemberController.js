var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Member = require('./Member');

//routers 
// CREATES A NEW USER
router.post('/', function (req, res) {
    Member.create({
            username : req.body.username,
            email : req.body.email,
            password : req.body.password
        }, 
        function (err, member) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(member);
        });
});

//gets all members in the database
router.get('/', function (req, res) {
    Member.find({}, function (err, members) {
        if (err) return res.status(500).send("There was a problem finding the members.");
        res.status(200).send(members);
    });
});

//gets a single member from the database by id
router.get('/:id', function (req, res) {
    Member.findById(req.params.id, function (err, member) {
        if (err) return res.status(500).send("There was a problem finding the member.");
        if (!member) return res.status(404).send("No member found.");
        res.status(200).send(member);
    });
});

//updates a single member in the database
router.put('/:id', function (req, res) {
    Member.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, member) {
        if (err) return res.status(500).send("There was a problem updating the member.");
        res.status(200).send(member);
    });
});

//deletes a single member in the database
router.delete('/:id', function (req, res) {
    Member.findByIdAndRemove(req.params.id, function (err, member) {
        if (err) return res.status(500).send("There was a problem deleting the member.");
        res.status(200).send("Member: "+ member.username +" was deleted.");
    });
});

module.exports = router;