const express = require('express');
const router = express.Router();
const { Review } = require('../models/Review');
const { auth } = require('../middleware/auth');

router.post('/saveReview', (req, res) => {
  const review = new Review(req.body);

  review.save((err, review) => {
    console.log(err);
    if (err) return res.json({ success: false, err });

    Review.find({ _id: review._id })
      .populate('writer')
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
});

router.post('/getReviews', (req, res) => {
  Review.find({ postId: req.body.movieId })
    .populate('writer')
    .exec((err, reviews) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, reviews });
    });
});

router.post('/getReviewsOfUser', (req, res) => {
  console.log(req.body);
  Review.find({ writer: req.body.userFrom })
    .populate('writer')
    .exec((err, reviews) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, reviews });
    });
});

module.exports = router;
