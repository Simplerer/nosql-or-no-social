const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .select('-__v')
            .then((thoughts) => {
                return res.json({ thoughts })
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },

    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Not a thought here Captain!' })
                    : res.json({ thought })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((data) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: data._id } },
                    { new: true }
                );
            })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Think again on that Id' })
                    : res.json({ thought })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Need another way to find that thought!' })
                    : res.json({ thought })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        )
            .then((reaction) => res.json(reaction))
            .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((thought) => {
                res.json(thought)
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    }

}