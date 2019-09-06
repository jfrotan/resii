var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  passwordConf: {
    type: String,
    required: true
  },
  accountStatus: {
    type: String,
    required: true,
    trim: true
  },
  accountRole: {
    type: String,
    required: false,
    trim: true
  }
});

// Authenticate the email and password against Mongo
UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ email: email }).exec(function(err, user) {
    if (err) {
      return callback(err, null);
    } else if (!user) {
      return callback("Invalid login information!", null);
    }

    // Did the user enter a password that matches our database?
    if (password !== user.password) {
      return callback("Invalid login information!", null);
    }

    // Is the user's account disabled?
    if (user.accountStatus === "disabled") {
      return callback(
        "Your account has been disabled, please contact us for more info.",
        null
      );
    }
    // We've found our user - return null for err and the user object from Mongo
    return callback(null, user);
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
