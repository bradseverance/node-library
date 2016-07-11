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
      _id: '',
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

    var starCheck = new RegExp('^[1-5]$');
    var isGood = false;

    // validate _id
    if (!ObjectID.isValid(req.body._id)) {
      req.body._id = null;
    }

    // validate stars
    if (!starCheck.test(req.body.stars)) {
      req.body.stars = 5;
    } else {
      req.body.stars = parseInt(req.body.stars);
    }

    // trim strings
    req.body.title = req.body.title.trim();
    req.body.description =req.body.description.trim();
    req.body.comments = req.body.comments.trim();
    req.body.author = req.body.author.trim();

    // book must have a title
    if (req.body.title !== '') {
      isGood = true;
    }

    // update book
    if (req.body._id) {




    // new book
    } else {

    }

    console.log(req.body);
    console.log(isGood);

    res.render('adminBookEdit', {
      title: 'New Book',
      nav: nav,
      book: req.body
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