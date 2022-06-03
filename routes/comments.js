const express = require('express');

const router = express.Router();

const CommentController = require('../controllers/CommentController');

const { authentication } = require('../middleware/authentication');

router.post('/:_id', authentication, CommentController.create);

module.exports = router;