const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

//ROUTERS
//Download handler
app.get('/api/download', (_req, res) => {
    res.download('./public/kittens_1.jpg', 'foo.jpg');
});

//Sendfile handler
app.get('/api/sendfile', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public/kittens_1.jpg'));
});

//attachment handler
app.get('/api/attachment', (_req, res) => {
    res.attachment('./public/kittens_1.jpg');
    res.end();
});

const port = 5001;

app.listen(port, () =>
    console.log(`Server is running and listening on port ${port}`)
    );