const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  console.log("MongoDB Connected");
};

module.exports = connectDB;
