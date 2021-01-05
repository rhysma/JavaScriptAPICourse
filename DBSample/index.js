let express = require('express');
let app = express();
let db = require('./db')

var port = process.env.PORT || 5002;
var server = app.listen(port, function(){
    console.log('Express server listening on port ' + port);
});
