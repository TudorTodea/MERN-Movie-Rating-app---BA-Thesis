const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');

connectDB();

app.use(express.json());
app.use(cors());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/favorite', require('./routes/Favorite'));
app.use('/api/watchlist', require('./routes/Watchlist'));
app.use('/api/review', require('./routes/Review'));
app.use('/api/private', require('./routes/private'));
app.use('/api/likedislike', require('./routes/Like'));
app.use('/api/rating', require('./routes/Rating'));

app.get('/', (req, res, next) => {
  res.send('Api running');
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);
