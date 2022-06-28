const express = require('express');
const router = express.Router();
const { Rating } = require('../models/Rating');
router.post('/getratings', (req, res) => {
  let variable = {};
  if (req.body.movieId) {
    variable = { movieId: req.body.movieId };
  }

  Rating.find(variable).exec((err, ratings) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, ratings });
  });
});

router.post('/getfinalrating', (req, res) => {
  let variable = {};
  let finalval;
  let sum = 0;
  if (req.body.movieId) {
    variable = { movieId: req.body.movieId };
  }
  Rating.countDocuments(
    { movieId: `${req.body.movieId}` },
    function (err, count) {
      Rating.find(variable).exec((err, ratings) => {
        ratings.map((val, index) => {
          sum = sum + val.rating;
        });
        finalval = (sum / count).toFixed(1);
        return res.status(200).json({ success: true, finalval });
      });
    }
  );
});
router.post('/getnrratings', async (req, res) => {
  console.log(req.body.movieId);
  Rating.countDocuments(
    { movieId: `${req.body.movieId}` },
    function (err, count) {
      if (err) {
        console.log(err);
      } else {
        return res.status(200).json({ success: true, count });
      }
    }
  );
});

router.post('/upvote', async (req, res) => {
  let variable = {};
  if (req.body.movieId) {
    variable = {
      movieId: req.body.movieId,
      user: req.body.user,
      rating: req.body.rating,
    };
  }
  const rating = new Rating(variable);

  rating.save((err, ratingResult) => {
    if (err) return res.json({ success: false, err });

    res.status(200).json({ success: true, ratingResult });
  });
});

router.post('/Rated', (req, res) => {
  Rating.find({
    user: req.body.user,
    movieId: req.body.movieId,
  }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (subscribe.length !== 0) {
      result = true;
    }

    res.status(200).json({ success: true, subcribed: result });
  });
});

router.post('/removeFromRatings', (req, res) => {
  Rating.findOneAndDelete({
    user: req.body.user,
    movieId: req.body.movieId,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});

module.exports = router;
