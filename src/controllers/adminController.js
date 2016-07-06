// mongo db
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var adminController = function (goodReadsService, nav) {

  var middleware = function (req, res, next) {
    if (!req.user) {
      return res.redirect('/evilPerson');
    }
    next();
  };

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

  var getBook = function (req, res) {

    var id = new ObjectID(req.params.id);

    mongodb.connect(process.env.DB_URL, function (err, db) {
      var collection = db.collection('books');
      collection.findOne({_id : id}, function (err, results) {
        res.render('adminBookEdit', {
          title: 'Book' + id,
          nav: nav,
          book: results
        });
        db.close();
      });
    });

  };

  return {
    getHome: getHome,
    getBook: getBook,
    middleware: middleware
  };

};

module.exports = adminController;