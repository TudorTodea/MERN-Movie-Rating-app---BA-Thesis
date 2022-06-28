const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Tudor:tudor@cluster0.dg03s.mongodb.net/AuthDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  console.log("MongoDB Connected");
};

module.exports = connectDB;
