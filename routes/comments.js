const express = require('express');

const router = express.Router();

const CommentController = require('../controllers/CommentController');

const {
  authentication,
  isAuthor,
  isAuthorComment,
} = require('../middleware/authentication');

router.post('/:_id', authentication, CommentController.create);
router.get('/', authentication, CommentController.getAllComments);
router.put(
  '/update/:_id',
  authentication,
  isAuthorComment,
  CommentController.updateComment
);
router.delete(
  '/delete/:_id',
  authentication,
  isAuthorComment,
  CommentController.delete
);
router.put('/likes/:_id', authentication, CommentController.like);
router.put('/dislike/:_id', authentication, CommentController.dislike);

module.exports = router;
