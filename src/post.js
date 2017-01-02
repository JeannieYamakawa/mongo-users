const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//posts model referred to as a "sub-document"
const PostSchema = new Schema({
    title: String,
    content: String
});

module.exports = PostSchema;
