const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const watchlistSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    movieId: {
      type: String,
    },
    movieTitle: {
      type: String,
    },
    moviePost: {
      type: String,
    },
    moviePoster: {
      type: String,
    },
    movieOverview: {
      type: String,
    },
    movieRunTime: {
      type: String,
    },
  },
  { timestamps: true }
);

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;
