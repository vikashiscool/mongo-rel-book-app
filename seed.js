var db = require("./models");
var ourBooks = require("books.json");

// console.log(ourBook);

// Add books to DB

db.Book.create(ourBooks, function(err, book){
  if(err){ return console.log(err);}
  console.log("Added everything");
  process.exit(0);
})


db.Book.findOne({title: "Ender's Game"}, function(err, book){
  if(err){ return console.log(err);}
  var newComment = {
    comment: "I could totally guess the ending.",
    person: "Justin"
  };
  book.comments.push(newComment);
  book.save(function (err, success){
  if(err) { return console.log(err)}
  console.log("Comment added successfully");
  })
});


//Remove books from DB  
db.Book.removeBook({title: "Ender's Game"}, function(err, book){
  if(err) {return console.log(err);}
  book.remove;
  book.save(function (err, success){
    if(err) { return console.log(err);}
    console.log('Book removed successfully');
  })
});



//Add comments to Books

//Remove comments from Books





