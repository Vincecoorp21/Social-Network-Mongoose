const express = require('express');

const UserController = require('../controllers/UserController');

const { authentication } = require('../middleware/authentication');

const router = express.Router();

router.post('/', UserController.create);
router.get('/', UserController.getAllusers);
router.get('/confirm/:email', UserController.confirm);
router.post('/login', UserController.login);
router.put('/logout', authentication, UserController.logout);
router.get('/userinfo', authentication, UserController.getUserInfo);

module.exports = router;
