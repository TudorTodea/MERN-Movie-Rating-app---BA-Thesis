const { Review } = require('../models/Review');

exports.saveReview = async (req, res, next) => {
    const review = new Review(req.body);

    review.save((err, review) => {
        if (err) return res.json({ success: false, err });

        Review.find({ _id: review._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).json({ success: true, result });
            });
    });
};

exports.getReviews = async (req, res, next) => {
    Review.find({ postId: req.body.movieId })
        .populate('writer')
        .exec((err, reviews) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, reviews });
        });
};

exports.getReviewsOfUser = async (req, res, next) => {
    Review.find({ writer: req.body.userFrom })
        .populate('writer')
        .exec((err, reviews) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, reviews });
        });
};