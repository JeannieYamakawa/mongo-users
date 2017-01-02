const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        //this error message that gets set to user.
        required: [true, 'Name is required.'],

    },
    postCount: Number
});

//creation of the user model (user class). represents the entire collection of user data.
const User = mongoose.model('user', UserSchema);


module.exports = User;
