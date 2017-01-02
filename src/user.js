const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: String,
    postCount: Number
});

//creation of the user model (user class). represents the entire collection of user data.
const User = mongoose.model('user', UserSchema);


module.exports = User;
