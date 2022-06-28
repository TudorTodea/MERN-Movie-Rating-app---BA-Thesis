const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getUsername,
  getIdFromUsername,
} = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/getUsername').post(getUsername);
router.route('/getIdFromUsername').post(getIdFromUsername);

module.exports = router;
