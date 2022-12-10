const Favorite = require('../models/Favorite');

exports.favoriteNumber = async (req, res, next) => {
    Favorite.find({ movieId: req.body.movieId }).exec((err, subscribe) => {
        if (err) return res.status(400).send(err);

        res.status(200).json({ success: true, subscribeNumber: subscribe.length });
    });
};

exports.favorited = async (req, res, next) => {
    Favorite.find({
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
};

exports.addToFavorites = async (req, res, next) => {
    const favorite = new Favorite(req.body);
    favorite.save((err) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true });
    });
};

exports.removeFromFavorites = async (req, res, next) => {
    Favorite.findOneAndDelete({
        movieId: req.body.movieId,
        userFrom: req.body.userFrom,
    }).exec((err, doc) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, doc });
    });
};

exports.getFavoredMovie = async (req, res, next) => {
    Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, favorites });
    });
};