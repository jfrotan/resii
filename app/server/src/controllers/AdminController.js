const User = require("../../models/user");
const mongoose = require("mongoose");
const gridfs = require("gridfs-stream");
const bodyParser = require("body-parser");

/** Required to connect to MongoDB - repeat code from routes.js */
const mongoURI =
  "mongodb://admin:admin@ds239648.mlab.com:39648/application-tracker";
const conn = mongoose.createConnection(mongoURI);
let gfs;

conn.once("open", () => {
  gfs = gridfs(conn.db, mongoose.mongo);
});
/** End of required code to connect to MongoDB */

module.exports = {
  async getAllUsers(req, res) {
    /** First, let's check if the user requesting the data has administrator status
     * saved to their profile! If not, we'll return an error message to display
     */
    if (!req.params.userEmail) {
      return res.status(403).send({
        error:
          "Your account does not have the required permissions to access admin functionality!"
      });
    }

    User.findOne({ email: req.params.userEmail }, function(error, user) {
      if (error) {
        return res.status(403).send({
          error:
            "Your account does not have the required permissions to access admin functionality!"
        });
      }

      /** Unable to retrieve any user with the specified user e-mail address */
      if (!user) {
        return res.status(403).send({
          error: "Unable to retrieve user list. Please try again!"
        });
      }

      /** If the user does not have the 'admin' role associated with their account, don't let them do anything */
      if (user.accountRole !== "admin" || user.accountStatus === "disabled") {
        return res.status(403).send({
          error:
            "Your account does not have the required permissions to access admin functionality!"
        });
      }

      /** We're able to filter certain fields by specifying them in the second argument for Mongoose!
       * Reference: https://stackoverflow.com/questions/24348437/mongoose-select-a-specific-field-with-find
       */
      User.find({}, "email accountStatus accountRole", function(error, users) {
        if (error) {
          return res.status(403).send({
            error: "Unable to retrieve user list. Please try again!"
          });
        }

        return res.status(200).send(users);
      });
    });
  },
  async toggleUserStatus(req, res) {
    if (!req.body.userEmail) {
      return res.status(403).send({
        error: "Unable to toggle the specified user's status. Please try again!"
      });
    }

    User.findOne({ email: req.body.userEmail }, function(error, user) {
      if (error) {
        return res.status(403).send({
          error:
            "Your account does not have the required permissions to access admin functionality!"
        });
      }

      /** Unable to retrieve any user with the specified user e-mail address */
      if (!user) {
        return res.status(403).send({
          error:
            "Unable to toggle the specified user's status. Please try again!"
        });
      }

      /** Attempt to update the user's account status and save it back into Mongo */
      user.accountStatus =
        user.accountStatus === "active" ? "disabled" : "active";

      user.save(function(err) {
        if (err) {
          return res.status(403).send({
            error:
              "Unable to toggle the specified user's status. Please try again!"
          });
        }

        /** Send back the newly updated table of ALL users to reflect the updates */
        User.find({}, "email accountStatus accountRole", function(
          error,
          users
        ) {
          if (error) {
            return res.status(403).send({
              error: "Unable to retrieve user list. Please try again!"
            });
          }

          return res.status(200).send(users);
        });
      });
    });
  }
};
