const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const { isEmail, isStrongPassword } = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email !!!'],
    unique: [true, 'Duplicate email'],
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email !!!']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password !!!'],
    minLength: [6, `Minimum characters are 6 !!!`],
    validate: [isStrongPassword, 'Use symbols, capital letters, small letters and numbers in your password !!!']
  }
});

// fire a function after an instance is saved to the database
userSchema.post('save', function (doc, next) {
  console.log("Doc:", doc);
  next();
});

// fire a function before an instance saved to the database
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password.toString(), salt);
  next();
});

// static method for login
userSchema.statics.login = async function (email, password) {
  // find a user based on an email
  const user = await User.findOne({ email });
  if (user) {
    // compare input password by user and the password saved in the DB
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Password is incorrect');
  }
  throw Error('This user not exists');
}

const User = mongoose.model("user", userSchema);

module.exports = User;
