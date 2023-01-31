const { Schema, model, STATES } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: { 
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema], 
})

module.exports = thoughtSchema;