// mongo db
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var adminController = function (bookService, nav) {

  var middleware = function (req, res, next) {
    if (!req.user) {
      return res.redirect('/evilPerson');
    }
    next();
  }

  var getHome = function (req, res) {

    res.render('adminHomeView', {
      title: 'Administrator Home',
      nav: nav
    });

  }

  return {
    getHome: getHome,
    middleware: middleware
  }

}

module.exports = adminController;