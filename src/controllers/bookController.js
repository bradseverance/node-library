// mongo db
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var bookController = function (bookService, nav) {

  // --------------------------------------- //
  // getBooks                                //
  // --------------------------------------- //
  var getBooks = function (req, res) {

    mongodb.connect(process.env.DB_URL, function (err, db) {

      var collection = db.collection('books');
      collection.find().toArray(function (err, results) {
        res.render('bookListView', {
          title: 'Book List',
          nav: nav,
          books: results
        });
        db.close();
      });

    });

  };

  // --------------------------------------- //
  // getAuthors                              //
  // --------------------------------------- //
  var getAuthors = function (req, res) {

    mongodb.connect(process.env.DB_URL, function (err, db) {

      var collection = db.collection('books');
      collection.find().toArray(function (err, results) {
        res.render('bookListView', {
          title: 'Book List',
          nav: nav,
          books: results
        });
        db.close();
      });

    });

  };

  // --------------------------------------- //
  // getBook                                 //
  // --------------------------------------- //
  var getBook = function (req, res) {

    var id = new ObjectID(req.params.id);

    mongodb.connect(process.env.DB_URL, function (err, db) {
      var collection = db.collection('books');
      collection.findOne({_id : id}, function (err, results) {

        bookService.getBookById(results.bookId, function (err, book) {
          results.book = book;

          res.render('bookView', {
            title: 'Book' + id,
            nav: nav,
            book: results
          });
          db.close();
        });

      });
    });

  };

  return {
    getBooks: getBooks,
    getAuthors: getAuthors,
    getBook: getBook
  };

};

module.exports = bookController;