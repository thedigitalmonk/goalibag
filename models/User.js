var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
   email: {type: String, unique: true},
   password: String
});

var User = mongoose.model('myuser', userSchema);
module.exports = User;