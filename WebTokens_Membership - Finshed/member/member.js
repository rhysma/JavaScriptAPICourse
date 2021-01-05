var mongoose = require('mongoose');  
var MemberSchema = new mongoose.Schema({  
  username: String,
  email: String,
  password: String
});
mongoose.model('Member', MemberSchema);

module.exports = mongoose.model('Member');