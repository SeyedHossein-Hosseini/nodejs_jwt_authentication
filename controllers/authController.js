const User = require("../models/User");

// based on seconds
const maxAge = 100;


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
  console.log(req.body);
  try {
    const user = await User.create({ email, password });
    res.status(201).json(user._id);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  res.send("attempted to login");
};
