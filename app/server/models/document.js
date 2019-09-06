var mongoose = require("mongoose");

var documentSchema = new mongoose.Schema({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimeptype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number,
  created_at: Date,
  updated_at: Date
});

var Document = mongoose.model("Document", documentSchema);

module.exports = Document;
