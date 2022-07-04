const express = require('express');

const UserController = require('../controllers/UserController');

const { authentication } = require('../middleware/authentication');

const { uploadUserImages } = require('../middleware/multer');

const router = express.Router();

router.post('/', uploadUserImages.single('imageUser'), UserController.create);
router.get('/', UserController.getAllusers);
router.get('/confirm/:email', UserController.confirm);
router.post('/login', UserController.login);
router.delete('/logout', authentication, UserController.logout);
router.get('/userinfo', authentication, UserController.getUserInfo);
router.put('/likes/:_id', authentication, UserController.like);
router.put('/dislikes/:_id', authentication, UserController.dislike);
router.put('/follow/:_id', authentication, UserController.follow);
router.put('/unfollow/:_id', authentication, UserController.unfollow);
router.get(
  '/numberfollow/:_id',
  authentication,
  UserController.getUserPostFollowers
);
router.get('/id/:_id', authentication, UserController.getUserById);
router.get('/search/:name', UserController.getUserByName);
module.exports = router;
