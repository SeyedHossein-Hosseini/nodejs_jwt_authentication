const User = require("../models/User");

const jwt = require('jsonwebtoken');

// based on seconds
const maxAge = 50;

const createToken = (id) => {
  let data = { time: Date(), userId: id };
  return jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: maxAge * 100,
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
      maxAge: maxAge * 1000 * 1000
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

  try {
    const user = await User.login(email, password);
    const userId = user._id;
    const token = createToken(user._id);
    res.cookie('jwt', token, {
      maxAge: maxAge * 1000 * 1000
    });
    res.status(200).json({ userId });
  }
  catch (err) {
    const errors = { email: "", password: "" };
    if (err.message.includes("This user not exists")) {
      errors.email = "This user not exists";
    }
    if (err.message.includes("Password is incorrect")) {
      errors.password = "Password is incorrect"
    }
    res.status(400).json({ errors });
  }
};


module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 1
  });

  res.redirect("/login");
}