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
      author: '',
      genre: '',
      description: '',
      stars: 5,
      comments: '',
      cover: ''
    };

    res.render('adminBookEdit', {
      title: 'New Book',
      nav: nav,
      book: book
    });
  };

  // --------------------------------------- //
  // upsertBook                              //
  // --------------------------------------- //
  var upsertBook = function (req, res) {

    console.log(req.body);

    // make sure variables exists
    var vars = {
      _id: req.body._id || 0,
      title: req.body.title || '',
      author: req.body.author || '',
      genre: req.body.genre || '',
      description: req.body.description || '',
      stars: req.body.stars || 5,
      comments: req.body.comments || '',
      cover: req.body.cover || ''
    };

    res.render('adminBookEdit', {
      title: 'New Book',
      nav: nav,
      book: vars
    });

  };

  return {
    getHome: getHome,
    getBook: getBook,
    newBook: newBook,
    upsertBook: upsertBook,
    middleware: middleware
  };

};

module.exports = adminController;