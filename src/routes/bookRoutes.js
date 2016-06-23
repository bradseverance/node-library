var express = require('express');

var bookRouter = express.Router();

// mongo db
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var router = function (nav) {

  // book list
  bookRouter.route('/').get(function (req, res) {

    var url = 'mongodb://localhost:27017/libraryApp';

    mongodb.connect(url, function (err, db) {
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

  });

  // single book
  bookRouter.route('/:id').get(function (req, res) {

    var id = new ObjectID(req.params.id);

    var url = 'mongodb://localhost:27017/libraryApp';

    mongodb.connect(url, function (err, db) {
      var collection = db.collection('books');
      collection.findOne({_id : id}, function (err, results) {
        res.render('bookView', {
          title: 'Book' + id,
          nav: nav,
          book: results
        });
        db.close();
      });
    });

  });

  return bookRouter;

};

module.exports = router;