const User = require('../models/User');

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
exports.getUsername = async (req, res, next) => {
  User.findOne({ _id: req.body.userFrom }).exec((err, result) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, result });
  });
};
exports.getIdFromUsername = async (req, res, next) => {
  User.findOne({ username: req.body.username }).exec((err, result) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, result });
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: 'Please provide email or password',
    });
    return;
  }
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(404).json({
        success: false,
        error: 'Invalid credentials',
      });
      return;
    }
    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      res.status(404).json({ success: false, error: 'Invalid credentials' });
      return;
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  const username = user.getUsername();
  const id = user.getID();

  res.status(statusCode).json({
    success: true,
    username: username,
    id: id,
    token,
  });
};
