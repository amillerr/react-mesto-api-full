const router = require('express').Router();
const {
  byIdValidate, userUpdateValidate, userAvatarValidate,
} = require('../middlewares/validRequest');
const {
  getUsers, getUserById, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUser);
router.get('/users/:id', byIdValidate, getUserById);
router.patch('/users/me', userUpdateValidate, updateUser);
router.patch('/users/me/avatar', userAvatarValidate, updateAvatar);

module.exports = router;
