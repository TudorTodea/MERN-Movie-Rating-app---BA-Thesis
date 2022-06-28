const mongoose = require('mongoose');
const ratingSchema = mongoose.Schema(
  {
    rating: { type: Number },
    movieId: { type: String },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);
const Rating = mongoose.model('Rating', ratingSchema);

module.exports = { Rating };
