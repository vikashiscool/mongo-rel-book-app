var express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path"),
    db = require("./models");

var app = express(),
    views = path.join(__dirname, "views");

app.use(bodyParser.urlencoded({extended: true}));

// tell our application what our assets are
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));



//Render home view
app.get("/", function (req, res) {
  var homePath = path.join(views, "home.html");
  res.sendFile(homePath);
});


//Return all books from db
app.get("/books", function (req, res) {
    db.Book.find({},
        function (err, books) {
            res.send(books);
        });
});

//POST route receives object that contains _id, comment, and person in req.body

app.post("/books", function (req, res){
    //Find book we want to add the comment to by matching the id
    db.Book.findOne({_id: req.body._id}, function (err, book) {
        if(err){
            return err;
        }
        //Create a new comment populated by comment text and person from req.body
        var newComment = {
            comment: req.body.comment,
            person: req.body.person
        };
        //Push newly-created comment into book's comment array
        book.comments.push(newComment);
        //Save book after comment is added
        book.save(function (err, success) {
            if (err) {return err;}
            //console.log("Comment added successfully");
            res.send(newComment);
        });
    })
});


//DELETE comment route receives an object that contains the id of the book and the comment in one string with a "=" between the two in req.body

app.delete("/books", function (req, res){
    //Split the two ids, so we can easily access each in one array (1st: book_id (index 0), 2nd: comment_id (index 1))
    var ids = req.body._id.toString.split("=");

    //Find the book with the comment we want to delete using the book ID
    db.Book.findOne({_id: ids[0]}, function (err, book){
        if(err){
            return err;
        }
        //Iterate through the book's comment array checking the IDs for the comment we want to delete.
        for(var i=0; i<book.comments.length; i++){
            if(book.comments[i]._id.toString === ids[1])
            {
                console.log("match found!");
                //When found, remote comment from array
                books.comment[i].remove();
                //Once we've removed the comment, we don't want to check any more of the array, so we break out of hte loop.
                break;
            }
        }
        console.log(book.comments);
        //Save the book after the comment has been removed
        book.save(function (err, success) {
            if(err) { return err; }
            res.send(success);
        })
    })

});



app.listen(3000, function() {
    console.log("Server is now listening on localhost:3000");
})
