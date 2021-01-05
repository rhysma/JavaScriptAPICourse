const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/test';

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});