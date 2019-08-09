//-File name: users.js
//-Author: Mou Chen
//-web site name: iToDo
//-file description: This is the users.js page. this use as to model to create user schema.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const findorcreate = require('mongoose-findorcreate');
//plugin Passport-Local Mongoose into User schema
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  usertype: String
});

//userSchema.plugin(findorcreate);
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;