const express = require('express');
const router = express.Router();

const Watchlist = require('../models/Watchlist');

router.post('/WatchlistNumber', (req, res) => {
  Watchlist.find({ movieId: req.body.movieId }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({ success: true, subscribeNumber: subscribe.length });
  });
});

router.post('/Watchlisted', (req, res) => {
  Watchlist.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, subscribe) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (subscribe.length !== 0) {
      result = true;
    }

    res.status(200).json({ success: true, subcribed: result });
  });
});

router.post('/addToWatchlist', (req, res) => {
  console.log(req.body);
  const watchlist = new Watchlist(req.body);
  watchlist.save((err) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/removeFromWatchlist', (req, res) => {
  Watchlist.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});

router.post('/getWatchlistedMovie', (req, res) => {
  Watchlist.find({ userFrom: req.body.userFrom }).exec((err, watchlisted) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, watchlisted });
  });
});

module.exports = router;
