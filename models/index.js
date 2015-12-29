var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/book_app");
// var ourBooks = require("../books.json")

module.exports.Book = require("./book");
