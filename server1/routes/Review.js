const express = require('express');
const { saveReview, getReviews, getReviewsOfUser } = require('../controllers/Review');
const router = express.Router();

router.post('/saveReview', saveReview);

router.post('/getReviews', getReviews);

router.post('/getReviewsOfUser', getReviewsOfUser);

module.exports = router;
