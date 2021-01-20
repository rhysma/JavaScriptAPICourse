var mongoose = require('mongoose');
var ColorsSchema = new mongoose.Schema({
    color: String,
    category: String,
    type: String
});

mongoose.model('Color', ColorsSchema);

module.exports = mongoose.model('Color');