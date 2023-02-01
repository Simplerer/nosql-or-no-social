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

    // get(req, res) {
    //     Student.findOne({ _id: req.params.studentId })
    //       .select('-__v')
    //       .lean()
    //       .then(async (student) =>
    //         !student
    //           ? res.status(404).json({ message: 'No student with that ID' })
    //           : res.json({
    //               student,
    //               grade: await grade(req.params.studentId),
    //             })
    //       )
    //       .catch((err) => {
    //         console.log(err);
    //         return res.status(500).json(err);
    //       });
    //   },

    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
      },



}