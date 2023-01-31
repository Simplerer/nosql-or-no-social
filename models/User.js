const { Schema, model  } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /.+\@.+\..+/,
    },
    thoughts: [],
    friends: [],
})

module.exports = userSchema;