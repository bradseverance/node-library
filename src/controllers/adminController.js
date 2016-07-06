// mongo db
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var adminController = function (bookService, nav) {

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

  return {
    getHome: getHome,
    middleware: middleware
  };

};

module.exports = adminController;