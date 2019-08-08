const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const findorcreate = require('mongoose-findorcreate');
//plugin Passport-Local Mongoose into User schema
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  username: String,
  password: String,
  // username: {type: String, required: true},
  // password: {type: String, required: true}
  email: String,
  //usertype: String
});

//userSchema.plugin(findorcreate);
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;