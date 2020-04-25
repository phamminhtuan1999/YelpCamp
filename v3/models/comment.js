var mongoose = require("mongoose");

var commentShema = mongoose.Schema({
  text: String,
  author: String,
});

module.exports = mongoose.model("Comment", commentShema);
