//bring in the express server and create application
let express = require('express');
const fileUpload = require('express-fileupload');
let app = express();
let cors = require('cors');

//tell express which folder has our HTML files
app.use(express.static('public'));

//needed for uploading files
app.use(express.text());
app.use(fileUpload());
app.use(express.raw({ type: 'image/*', limit: '5mb' }));

//use the express Router object
let router = express.Router();

//set up middleware to support JSON data parsing in request object
app.use(express.json());

//adding in what is needed to enable CORS for all requests
app.use(cors());


//ROUTER SECTION
app.post('/api/multiple-file', (req, res) =>{
    res.set('Content-Type', 'text/html');
    let response = '<table>';
    for (const f of req.files.myfiles){
        f.mv('./uploads/' + f.name);
        response += `<tr>
                        <td>Name: ${f.name}</td>
                        <td>Size: ${f.size}</td>
                        <td>MIME Type: ${f.mimetype}</td>
                        </tr>`;
    }
    response += '</table>';
    res.send(response);
});

//Download handler
app.get('/api/download', (_req, res) => {
    res.download('./public/dog.jpg', 'dog.jpg');
});
    

//configure the router so all routers all prefixed with /api/v1
app.use('/api', router);

//create the server to listen on port 5001
var server = app.listen(5001, function(){
    console.log('Node server is running on http://localhost:5001...');
})