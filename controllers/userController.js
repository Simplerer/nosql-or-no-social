const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {

    getAllUsers(req, res) {
        User.find()
            .select('-__v')
            .then((users) => {
                return res.json({ users })
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },

    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No one by that Id, why not make one?' })
                    : res.json({ user })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json({ message: 'Welcome newbie!' }))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No one by that Id, why not make one?' })
                    : res.json({ message: 'All up to date!' })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    removeUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
            Thought.deleteMany({ _id: { $in: user.thoughts }})
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No one by that Id, who else will we try to remove?' })
                    : res.json({ message: 'Come again!' }))
                )            
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    addFriend(req, res) {

        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true })
            .then((user) => {
                res.json({ message: 'Welcome friend!' })
            })

            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No one by that Id, who else will we try to remove?' })
                    : res.json({ message: 'Bye Felicia!' })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    }
}