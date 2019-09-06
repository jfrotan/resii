const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

/** Generate a token for the specific user to be used in the front-end */
function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
}

module.exports = {
  async Register(req, res) {
    try {
      // Destruct the body into separate variables for manipulation
      const { email, password, passwordConf, accountStatus } = req.body.User;

      if (!email) {
        return res
          .status(403)
          .send({ error: "Invalid e-mail address. Please try again!" });
      }

      if (password !== passwordConf) {
        return res
          .status(403)
          .send({ error: "Both passwords do not match. Please try again!" });
      }

      /** There is an existing e-mail address  */
      User.findOne({ email: email }, function(error, user) {
        if (user) {
          return res.status(403).send({
            error:
              "This e-mail is already registered to an existing account. Please try again!"
          });
        }

        /** Give a user whose not an admin a default status of 'user' */
        if (!accountStatus) {
          req.body.User.accountStatus = "user";
        }

        /** Create the user with the data entered */
        User.create(req.body.User, function(error, user) {
          if (error) {
            return res.status(403).send({
              error:
                "An error occured whilst creating your account. Please try again!"
            });
          }

          const userJson = user.toJSON();
          return res.send({
            user: userJson,
            token: jwtSignUser(userJson)
          });
        });
      });
    } catch (err) {
      return res.status(403).send({
        error: "Invalid registration information!"
      });
    }
  },
  async Login(req, res) {
    const { email, password } = req.body.User;

    if (!email || !password) {
      return res
        .status(403)
        .send({ error: "Invalid login information. Please try again!" });
    }

    User.authenticate(email, password, function(error, user) {
      if (error) {
        return res.status(403).send({ error: error.toString() });
      }

      const userJson = user.toJSON();
      return res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      });
    });
  }
};
