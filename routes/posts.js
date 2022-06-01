const express = require('express');

const router = express.Router();

const PostController = require('../controllers/PostController');
const { authentication } = require('../middleware/authentication');

//const { authentication } = require('../middleware/authentication');

router.post('/', authentication, PostController.create); //tiene que estar autenticado
router.get('/', PostController.getAll);
router.get('/search/:name/', PostController.getPostByName);
router.get('/id/:_id', PostController.getById);
router.delete('/id/:_id', authentication, PostController.delete);
router.put('/id/:_id', authentication, PostController.update);

module.exports = router;
