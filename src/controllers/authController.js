// mongo db
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var authController = function (nav) {

  var getAdmin = function (req,res) {

    res.render('adminView', {
      title: 'Login',
      nav: nav
    });

  };

  var getLogin = function (req, res) {
    res.redirect('/admin/home');
  };

  return {
    getAdmin: getAdmin,
    getLogin: getLogin
  };

};

module.exports = authController;