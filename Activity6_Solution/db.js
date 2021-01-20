const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/activity6';

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});