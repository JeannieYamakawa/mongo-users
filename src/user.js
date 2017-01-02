const mongoose = require('mongoose');
const PostSchema = require("./post")
const Schema = mongoose.Schema;

//user model referred to as a "document"
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
    postCount: Number,
    //embedding the sub-document of posts below!
    posts: [PostSchema]
});

//creation of the user model (user class). represents the entire collection of user data.
const User = mongoose.model('user', UserSchema);


module.exports = User;
