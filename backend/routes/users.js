const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const celebrate = require('../middlewares/celebrate');

const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.use(auth);

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', celebrate.validateUserId, getUser);
router.patch('/me', celebrate.validateUpdateUser, updateUser);
router.patch('/me/avatar', celebrate.validateUserAvatar, updateAvatar);

module.exports = router;
