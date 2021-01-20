var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Color = require('./Colors');

//routers!
//inserts a color into the database
router.post('/', function(req, res){
    Color.create({
        color: req.body.color,
        category: req.body.category,
        type: req.body.type
    },
    function(err, color){
        if(err) return res.status(500).send("There was a problem adding the color");
        res.status(200).send(color);
    });
});

//get all colors in the database
router.get('/', function(req, res){
    Color.find({}, function(err, colors){
        if(err) return res.status(500).send("There was a problem getting the colors");
        res.status(200).send(colors);
    });
});

//update information about an existing color by ID
router.put('/:id', function(req, res){
    Color.findByIdAndUpdate(req.params.id, req.body, {new:true},
        function(err, color){
            if(err) return res.status(500).send("There was a problem updating the color");
            res.status(200).send(color);
        });
});

//deletes a single color from the database by ID
router.delete('/:id', function(req, res){
    Color.findByIdAndRemove(req.params.id, function(err, color){
        if(err) return res.status(500).send("There was a problem deleting the color");
        res.status(200).send("Color: " + color.color + " was deleted ");
    });
});

//find a color by name
router.get('/search', function(req, res){
    var regex = new RegExp(req.query.name, "i"), 
    query = {color : regex};
    console.log(req.query.name)
    Color.find(query, function(err, colors){
        if(err) return res.status(500).send("There was a problem finding the colors");
        res.status(200).send(colors);
    });

});


module.exports = router;