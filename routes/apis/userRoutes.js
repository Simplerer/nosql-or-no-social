const router = require('express').Router();
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    removeUser,
    addFriend,
    removeFriend

} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getOneUser).put(updateUser).delete(removeUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;