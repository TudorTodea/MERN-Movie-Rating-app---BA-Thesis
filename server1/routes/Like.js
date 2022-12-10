const express = require('express');
const { getLikes, getDislikes, upLike, unLike, unDislike, upDislike } = require('../controllers/Like');
const router = express.Router();


router.post('/getLikes', getLikes);

router.post('/getDislikes', getDislikes);

router.post('/upLike', upLike);

router.post('/unLike', unLike);

router.post('/unDislike', unDislike);

router.post('/upDislike', upDislike);

module.exports = router;
