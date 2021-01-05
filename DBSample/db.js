const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/test';

mongoose.connect(uri, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    
    //schema for our Member
    const memberSchema = new mongoose.Schema({
    username: String
    });

  //compile the model
  const Member = mongoose.model('Members', memberSchema);
  
      //create an instance of the object
      const member1 = new Member({ username: 'Stanley' });
      const member2 = new Member({username: 'Sara'});
      console.log(member1.username);
      console.log(member2.username);

});