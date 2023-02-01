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
        required: [true, 'Need email for solicitation purposes!'],
        validate: [(val) => {
            return /.+\@.+\..+/.test(val)
        }, 'Valid email required!'],        
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

userSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

const User = model('user', userSchema);

module.exports = User;