var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Comment is embedded
var CommentSchema = new Schema({
    comment: String,
    person: String
});

var BookSchema = new Schema({
  title: String,
  author: String,
  description: String,
  genre: String,
  ISBN: Number,
  comments: [CommentSchema], //empty array based on Comment model
});

var Comment = mongoose.model("Comment", CommentSchema);
var Book = mongoose.model("Book", BookSchema);

module.exports = Book;