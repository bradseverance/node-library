// mongo db
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var authController = function (nav) {

  // --------------------------------------- //
  // getAdmin                                //
  // --------------------------------------- //
  var getAdmin = function (req,res) {

    var failureMessage = '';

    // seems like there should be a better way to do this
    if (req.session.hasOwnProperty('flash')) {
      if (req.session.flash.hasOwnProperty('error')) {
        if (Array.isArray(req.session.flash.error)) {
          if (req.session.flash.error.length) {
            failureMessage = req.session.flash.error[0];
            // remove flash message; it seems to persist
            delete req.session.flash;
          }
        }
      }
    }

    res.render('adminView', {
      title: 'Login',
      nav: nav,
      failureMessage: failureMessage
    });

  };

  return {
    getAdmin: getAdmin
  };

};

module.exports = authController;