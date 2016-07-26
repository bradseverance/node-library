// mongo db
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var bookController = function (goodReadsService, nav) {

  // --------------------------------------- //
  // getBooks                                //
  // --------------------------------------- //
  var getBooks = function (req, res) {

    mongodb.connect(process.env.DB_URL, function (err, db) {

      var collection = db.collection('books');
      collection.find().toArray(function (err, results) {

        var i = 0;

        // loop over array and create excerpts
        for (i; i < results.length; i++) {
          if (results[i].hasOwnProperty('description')) {
            results[i].excerpt = results[i].description.split(' ').slice(0, 25).join(' ');
          } else {
            results[i].excerpt = '';
          }
        }

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
      collection.aggregate(
        [
          {$group : {
            _id : '$author',
            books: {
              $push: {
                id: '$_id',
                title: '$title',
                genre: '$genre'
              }
            }
          }}
        ], function (err, results) {
        res.render('authorListView', {
          title: 'Author List',
          nav: nav,
          authors: results
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

        goodReadsService.getBookById(results.bookId, function (err, book) {
          results.book = book;

          res.render('bookView', {
            title: 'Book View',
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