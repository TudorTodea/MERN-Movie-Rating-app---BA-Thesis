const { Like } = require('../models/Like');
const { Dislike } = require('../models/Dislike');

exports.getLikes = async (req, res, next) => {
    let variable = {};
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId };
    } else {
        variable = { reviewId: req.body.reviewId };
    }

    Like.find(variable).exec((err, likes) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, likes });
    });
};

exports.getDislikes = async (req, res, next) => {
    let variable = {};
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId };
    } else {
        variable = { reviewId: req.body.reviewId };
    }

    Dislike.find(variable).exec((err, dislikes) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, dislikes });
    });
};

exports.upLike = async (req, res, next) => {
    let variable = {};
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId, userId: req.body.userId };
    } else {
        variable = { reviewId: req.body.reviewId, userId: req.body.userId };
    }

    const like = new Like(variable);

    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err });
        Dislike.findOneAndDelete(variable).exec((err, disLikeResult) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true });
        });
    });
};

exports.unLike = async (req, res, next) => {
    let variable = {};
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId, userId: req.body.userId };
    } else {
        variable = { reviewId: req.body.reviewId, userId: req.body.userId };
    }

    Like.findOneAndDelete(variable).exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true });
    });
};

exports.unDislike = async (req, res, next) => {
    let variable = {};
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId, userId: req.body.userId };
    } else {
        variable = { reviewId: req.body.reviewId, userId: req.body.userId };
    }

    Dislike.findOneAndDelete(variable).exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true });
    });
};

exports.upDislike = async (req, res, next) => {
    let variable = {};
    if (req.body.movieId) {
        variable = { movieId: req.body.movieId, userId: req.body.userId };
    } else {
        variable = { reviewId: req.body.reviewId, userId: req.body.userId };
    }

    const disLike = new Dislike(variable);

    disLike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err });

        Like.findOneAndDelete(variable).exec((err, likeResult) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true });
        });
    });
};