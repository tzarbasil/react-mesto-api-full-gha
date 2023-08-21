const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const celebrate = require('../middlewares/celebrate');

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.use(auth);

router.get('/', getCards);
router.delete('/:cardId', celebrate.validateCardId, deleteCard);
router.post('/', celebrate.validateCreateCard, createCard);
router.put('/:cardId/likes', celebrate.validateCardId, likeCard);
router.delete('/:cardId/likes', celebrate.validateCardId, dislikeCard);

module.exports = router;
