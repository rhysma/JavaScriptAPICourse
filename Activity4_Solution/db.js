const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/activity4';

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});