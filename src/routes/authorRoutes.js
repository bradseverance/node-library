var express = require('express');

var authorRoutes = express.Router();

// mongo db
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var router = function (nav) {

  // book list
  authorRoutes.route('/').get(function (req, res) {

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

  });

  // single book
  authorRoutes.route('/:id').get(function (req, res) {

    var id = new ObjectID(req.params.id);

    mongodb.connect(process.env.DB_URL, function (err, db) {
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

  return authorRoutes;

};

module.exports = router;