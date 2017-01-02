const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            //below is similar to an 'if' statement
            validator:  (name) => name.length > 2,
                //this is sent to user
                message: 'Name must be longer than 2 characters.'
            },
        //this error message that gets set to user.
        required: [true, 'Name is required.']

    },
    postCount: Number
});

//creation of the user model (user class). represents the entire collection of user data.
const User = mongoose.model('user', UserSchema);


module.exports = User;
