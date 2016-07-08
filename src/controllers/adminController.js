// mongo db
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var adminController = function (goodReadsService, nav) {

  // --------------------------------------- //
  // middleware                              //
  // --------------------------------------- //
  var middleware = function (req, res, next) {
    if (!req.user) {
      return res.redirect('/evilPerson');
    }
    next();
  };

  // --------------------------------------- //
  // getHome                                 //
  // --------------------------------------- //
  var getHome = function (req, res) {

    mongodb.connect(process.env.DB_URL, function (err, db) {

      var collection = db.collection('books');
      collection.find().toArray(function (err, results) {
        res.render('adminHomeView', {
          title: 'Administrator Home',
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
        console.log(results);
        res.render('adminBookEdit', {
          title: 'Edit Book',
          nav: nav,
          book: results
        });
        db.close();
      });
    });

  };

  // --------------------------------------- //
  // newBook                                 //
  // --------------------------------------- //
  var newBook = function (req, res) {

    var book = {
      _id: 0,
      title: '',
      genre: '',
      author: '',
      description: '',
      comments: '',
      stars: 5
    };

    res.render('adminBookEdit', {
      title: 'New Book',
      nav: nav,
      book: book
    });
  }

  return {
    getHome: getHome,
    getBook: getBook,
    newBook: newBook,
    middleware: middleware
  };

};

module.exports = adminController;