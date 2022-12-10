const { Rating } = require('../models/Rating');

exports.getRatings = async (req, res, next) => {
    let variable = {};
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId };
    }

    Rating.find(variable).exec((err, ratings) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, ratings });
    });
};

exports.getRatingsFromID = async (req, res, next) => {
    let variable = {};
    variable = { movieId: req.body.movieId, user: req.body.user };

    Rating.find(variable).exec((err, ratings) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, ratings });
    });
};

exports.getFinalRating = async (req, res, next) => {
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
};


exports.getNrRatings = async (req, res, next) => {
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
};

exports.upVote = async (req, res, next) => {
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
};

exports.Rated = async (req, res, next) => {
    let user = req.query.user;
    let movieId = req.query.movieId;

    Rating.find({
        user: user,
        movieId: movieId,
    }).exec((err, subscribe) => {
        if (err) return res.status(400).send(err);

        let result = false;
        if (subscribe.length !== 0) {
            result = true;
        }

        res.status(200).json({ success: true, subcribed: result });
    });
};

exports.removeFromRatings = async (req, res, next) => {
    let user = req.query.user;
    let movieId = req.query.movieId;
    Rating.findOneAndDelete({
        user: user,
        movieId: movieId,
    }).exec((err, doc) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, doc });
    });
};