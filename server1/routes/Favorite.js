const express = require('express');
const { favoriteNumber, favorited, addToFavorites, removeFromFavorites, getFavoredMovie } = require('../controllers/Favorite');
const router = express.Router();

router.post('/favoriteNumber', favoriteNumber);

router.post('/favorited', favorited);

router.post('/addToFavorite', addToFavorites);

router.post('/removeFromFavorite', removeFromFavorites);

router.post('/getFavoredMovie', getFavoredMovie);

module.exports = router;
