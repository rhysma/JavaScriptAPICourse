//bring in the express server and create application
let express = require('express');
let app = express();
let colorsRepo = require('./repos/colorsRepo');
let cors = require('cors');

//use the express Router object
let router = express.Router();

//set up middleware to support JSON data parsing in request object
app.use(express.json());

//adding in what is needed to enable CORS for all requests
app.use(cors());


//ROUTER SECTION
//create GET to return a list of colors
router.get('/', function (req, res, next){
    colorsRepo.get(function(data){
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All colors retrieved",
            "data" : data
        });
    },function(err){
        next(err);
    });
});

//create the router that uses an id calling the getById function
router.get('/:id', function(req, res, next){
    colorsRepo.getByID(req.params.id, function(data){
        if(data){
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message" : "Color retrieved",
                "data": data
            });
        }
        else{
            res.status(404).send({
                "status": 404,
                "statusText": "Not Found",
                "message": "The color with id '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The color with id '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function (err) {
        next(err);
      });
    });

    //inserts a new color 
    router.post('/', function(req, res, next){
        colorsRepo.insert(req.body, function(data){
            res.status(201).json({
                "status":201,
                "statusText": "Created",
                "message": "New Color Added",
                "data": data
            });
        }, function(err){
            next(err);
        });
    })

    //update an existing color
    router.put('/:id', function(req, res, next){
        colorsRepo.getByID(req.params.id, function(data){
            if(data){
                //attempt to update the data since we found an object
                colorsRepo.update(req.body, req.params.id, function(data){
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "Color '" + req.params.id + "' updated",
                        "data": data
                });
            });
            }
            else{
                res.status(404).send({
                    "status":404,
                    "statusText": "Not Found",
                    "message": "The color with id '" + req.params.id + "' was not found",
                    "error":{
                        "code": "NOT_FOUND",
                        "message": "The color with id '" + req.params.id + "' was not found"
                    }
                });
            }
        }, function(err){
            next(err);
        });
    })

    //delete a color
    router.delete('/:id', function(req, res, next){
        colorsRepo.getByID(req.params.id, function(data){
            if(data){
                //attempt to delete this item
                colorsRepo.delete(req.params.id, function(data){
                    res.status(200).json({
                        "status":200,
                        "statusText": "OK",
                        "message": "The color '" + req.params.id + "' has been deleted",
                        "data": "The color '" + req.params.id + "' has been deleted" 
                    });
                });
            }
            else{
                res.status(404).send({
                    "status":404,
                    "statusText": "Not Found",
                    "message": "The color with id '" + req.params.id + "' was not found",
                    "error":{
                        "code": "NOT_FOUND",
                        "message": "The color with id '" + req.params.id + "' was not found"
                    }    
                });
            }
        }, function(err){
            next(err);
        });
    })

//configure the router so all routers all prefixed with /api/v1
app.use('/api', router);

//create the server to listen on port 5000
var server = app.listen(5000, function(){
    console.log('Node server is running on http://localhost:5000...');
})