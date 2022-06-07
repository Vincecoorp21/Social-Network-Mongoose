const express = require('express');

const router = express.Router();

const PostController = require('../controllers/PostController');

require('dotenv').config();

const { uploadPostImages } = require('../middleware/multer');

const {
  authentication,
  isAdmin,
  isAuthor,
} = require('../middleware/authentication');

//const { authentication } = require('../middleware/authentication');

router.post(
  '/',
  authentication,
  uploadPostImages.single('imagePost'),
  PostController.create
); //tiene que estar autenticado
router.get('/', authentication, isAdmin, PostController.getAll);
router.get('/search/:name/', PostController.getPostByName);
router.get('/id/:_id', PostController.getById);
router.delete('/id/:_id', authentication, isAuthor, PostController.delete);
router.put(
  '/id/:_id',
  authentication,
  isAuthor,
  uploadPostImages.single('imagePost'),
  PostController.update
);
router.get('/getallwith', authentication, PostController.getAllWComments);
module.exports = router;
