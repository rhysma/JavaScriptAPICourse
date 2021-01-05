//bring in the express server and create application
let express = require('express');
let app = express();
let citiesRepo = require('./repos/citiesRepo');
let cors = require('cors');


//use the express Router object
let router = express.Router();

//set up middleware to support JSON data parsing in request object
app.use(express.json());

//adding in what is needed to enable CORS for all requests
app.use(cors());


//ROUTER SECTION
//create GET to return a list of cities
router.get('/', function (req, res, next){
    citiesRepo.get(function(data){
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All cities retrieved",
            "data" : data
        });
    },function(err){
        next(err);
    });
});

//create the GET/search to search for cities for by id or name
// /search?id=n&name=str
router.get('/search', function(req, res, next){
    let searchObject = {
        "id": req.query.id,
        "name": req.query.name
    };

    citiesRepo.search(searchObject, function(data){
        res.status(200).json({
            "status":200,
            "statusText": "OK",
            "message": "Search results retrieved",
            "data": data
        });
    }, function(err){
        next(err);
    });
});

//create the router that uses an id calling the getById function
router.get('/:id', function(req, res, next){
    citiesRepo.getByID(req.params.id, function(data){
        if(data){
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message" : "City retrieved",
                "data": data
            });
        }
        else{
            res.status(404).send({
                "status": 404,
                "statusText": "Not Found",
                "message": "The city with id '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The city with id '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function (err) {
        next(err);
      });
    });

    router.post('/', function(req, res, next){
        citiesRepo.insert(req.body, function(data){
            res.status(201).json({
                "status":201,
                "statusText": "Created",
                "message": "New City Added",
                "data": data
            });
        }, function(err){
            next(err);
        });
    })

    router.put('/:id', function(req, res, next){
        citiesRepo.getByID(req.params.id, function(data){
            if(data){
                //attempt to update the data since we found an object
                citiesRepo.update(req.body, req.params.id, function(data){
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "City '" + req.params.id + "' updated",
                        "data": data
                });
            });
            }
            else{
                res.status(404).send({
                    "status":404,
                    "statusText": "Not Found",
                    "message": "The city with id '" + req.params.id + "' was not found",
                    "error":{
                        "code": "NOT_FOUND",
                        "message": "The city with id '" + req.params.id + "' was not found"
                    }
                });
            }
        }, function(err){
            next(err);
        });
    })

    router.delete('/:id', function(req, res, next){
        citiesRepo.getByID(req.params.id, function(data){
            if(data){
                //attempt to delete this item
                citiesRepo.delete(req.params.id, function(data){
                    res.status(200).json({
                        "status":200,
                        "statusText": "OK",
                        "message": "The city '" + req.params.id + "' has been deleted",
                        "data": "The city '" + req.params.id + "' has been deleted" 
                    });
                });
            }
            else{
                res.status(404).send({
                    "status":404,
                    "statusText": "Not Found",
                    "message": "The city with id '" + req.params.id + "' was not found",
                    "error":{
                        "code": "NOT_FOUND",
                        "message": "The city with id '" + req.params.id + "' was not found"
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