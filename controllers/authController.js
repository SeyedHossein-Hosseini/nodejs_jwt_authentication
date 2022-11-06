const User = require("../models/User");

const jwt = require('jsonwebtoken');

// based on seconds
const maxAge = 100;


// let jwtSecretKey = process.env.JWT_SECRET_KEY;
// let data = {
//   time: Date(),
//   userId: 12,
// }

// const token = jwt.sign(data, jwtSecretKey);

// res.send(token);


const createToken = (id) => {
  let data = { time: Date(), userId: id };
  return jwt.sign(data, process.env.JWT_SECRET_STRING);
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
    res.cookie('jwt', token);
    res.status(201).json(user._id);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  res.send("attempted to login");
};
