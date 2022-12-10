const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getUsername,
  getIdFromUsername,
  changeAvatar
} = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/getUsername').post(getUsername);
router.route('/getIdFromUsername').post(getIdFromUsername);
router.route('/changeAvatar').post(changeAvatar);


module.exports = router;
