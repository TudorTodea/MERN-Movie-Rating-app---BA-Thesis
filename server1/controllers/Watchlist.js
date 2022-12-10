const Watchlist = require('../models/Watchlist');

exports.WatchlistNumber = async (req, res, next) => {
    Watchlist.find({ movieId: req.body.movieId }).exec((err, subscribe) => {
        if (err) return res.status(400).send(err);

        res.status(200).json({ success: true, subscribeNumber: subscribe.length });
    });
};

exports.Watchlisted = async (req, res, next) => {
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
};

exports.addToWatchlist = async (req, res, next) => {
    const watchlist = new Watchlist(req.body);
    watchlist.save((err) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true });
    });
};

exports.removeFromWatchlist = async (req, res, next) => {
    Watchlist.findOneAndDelete({
        movieId: req.body.movieId,
        userFrom: req.body.userFrom,
    }).exec((err, doc) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, doc });
    });
};

exports.getWatchlistedMovie = async (req, res, next) => {
    Watchlist.find({ userFrom: req.body.userFrom }).exec((err, watchlisted) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, watchlisted });
    });
};