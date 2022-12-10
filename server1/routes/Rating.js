const express = require('express');
const { getRatings, getRatingsFromID, getFinalRating, getNrRatings, upVote, Rated, removeFromRatings } = require('../controllers/Rating');
const router = express.Router();

router.post('/getratings', getRatings);

router.post('/getratingsfromId', getRatingsFromID);

router.post('/getfinalrating', getFinalRating);

router.post('/getnrratings', getNrRatings);

router.post('/upvote', upVote);

router.get('/Rated', Rated);

router.delete('/removeFromRatings', removeFromRatings);

module.exports = router;
