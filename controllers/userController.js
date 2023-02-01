const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {

    getAllUsers(req, res) {
        User.find()
            .then((users) => {
                return res.json({users})
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },

    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No one by that Id, why not make one?' })
              : res.json({user})
          )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },

    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
      },

    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $set: req.body },
            { new: true }
            )
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No one by that Id, why not make one?' })
          : res.json({user})
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },

    removeUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No one by that Id, who else will we try to remove?' })
          : res.json({user})
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    }



}