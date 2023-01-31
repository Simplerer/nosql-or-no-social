const router = require('express').Router();
const {
    getAllUsers,
    getOneStudent,
    createStudent,
    updateStudent,
    removeStudent,
    addFriend,
    removeFriend

} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createStudent);

router.route('/:userId').get(getOneStudent).put(updateStudent).delete(removeStudent);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;