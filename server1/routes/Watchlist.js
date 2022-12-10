const express = require('express');
const { WatchlistNumber, Watchlisted, addToWatchlist, removeFromWatchlist, getWatchlistedMovie } = require('../controllers/Watchlist');
const router = express.Router();

router.post('/WatchlistNumber', WatchlistNumber);

router.post('/Watchlisted', Watchlisted);

router.post('/addToWatchlist', addToWatchlist);

router.post('/removeFromWatchlist', removeFromWatchlist);

router.post('/getWatchlistedMovie', getWatchlistedMovie);

module.exports = router;
