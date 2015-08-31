// wait for the document to be ready
$(function () {
    console.log("app.js is now running");

    var $booksCon = $("#booksCon");
    var bookHTML = $("#bookTemp").html();
    var bookTemp = _.template(bookHTML);

    $.get("/books").
        done(function(data) {
            console.log(data);
            $(data).each(function (index, book) {
                var $book = $(bookTemp(book));
                $booksCon.append($book);
            });
    });



});
