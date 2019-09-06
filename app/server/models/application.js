const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fileName: String,
  userEmail: String,
  file: {
    data: Buffer,
    contentType: String
  },
  tags: Array
});

const Application = mongoose.model("application", applicationSchema);
module.exports = Application;
