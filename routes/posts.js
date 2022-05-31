const express = require('express');
const PostController = require('../controllers/PostController');

const router = express.Router();

router.post('/', PostController.create);
router.get('/', PostController.getAll);
router.get('/search/:name/', PostController.getPostByName);
router.get('/id/:_id', PostController.getById);

module.exports = router;
