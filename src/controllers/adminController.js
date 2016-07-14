// mongo db
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
// validator
var validator = require('validator');

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
      _id: '',
      title: '',
      author: '',
      genre: '',
      description: '',
      stars: 5,
      comments: '',
      cover: ''
    };

    var response = {initialize: 1};

    res.render('adminBookEdit', {
      title: 'New Book',
      nav: nav,
      book: book,
      response: response
    });
  };

  // --------------------------------------- //
  // upsertBook                              //
  // --------------------------------------- //
  var upsertBook = function (req, res) {

    var errors = [];
    var response = {
      initialize: 0
    };
    book = {};

    // validate _id
    if (!ObjectID.isValid(req.body._id)) {
      book.body._id = null;
    }

    // validate stars
    if (!validator.isIn(req.body.stars, ['1','2','3','4','5'])) {
      book.stars = 5;
    } else {
      book.stars = parseInt(req.body.stars);
    }

    // trim strings
    book.title = req.body.title.trim();
    book.description =req.body.description.trim();
    book.comments = req.body.comments.trim();
    book.author = req.body.author.trim();
    book.cover = req.body.cover.trim();

    // book must have a title
    if (validator.isNull(book.title)) {
      errors.push('You must enter a title');
    }

    if (validator.isNull(book.author)) {
      errors.push('You must enter an author');
    }

    if (!validator.isNull(book.cover) && !validator.isURL(book.cover)) {
      errors.push('You must enter a valid URL for the cover');
    }

    if (errors.length) {
      response.status = 0;
      response.flashClass = 'bg-danger';
      response.message = 'There were errors in you inputs';
    } else {
      response.status = 1;
      response.flashClass = 'bg-success';
      response.message = 'The book has been entered successfully';
    }


    res.render('adminBookEdit', {
      title: 'New Book',
      nav: nav,
      book: book,
      response: response
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