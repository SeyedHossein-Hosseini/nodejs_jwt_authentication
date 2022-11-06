const User = require("../models/User");

const jwt = require('jsonwebtoken');

// based on seconds
const maxAge = 5;

const createToken = (id) => {
  let data = { time: Date(), userId: id };
  return jwt.sign(data, process.env.JWT_SECRET_STRING, {
    expiresIn: maxAge,
    // maxAge: 1000 * 5
  });
};

const handleErrors = (errors) => {
  let _errors = { email: '', password: '' };

  if (errors.message.includes(`E11000 duplicate key error`)) {
    _errors.email = 'Email is already taken';
    return _errors;
  }

  Object.values(errors.errors).forEach(({ properties }) => {
    _errors[properties.path] = properties.message;
  });

  return _errors;
}


module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, {
      maxAge: maxAge * 1000
    });
    const userId = user._id;
    res.status(201).json({ userId });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  res.send("attempted to login");
};
