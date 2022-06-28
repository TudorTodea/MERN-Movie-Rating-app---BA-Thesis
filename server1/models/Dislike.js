const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewId: {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  },
  { timestamps: true }
);

const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = { Dislike };
