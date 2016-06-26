var express = require('express');

var mainRouter = express.Router();

// mongo db
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var router = function (nav) {

  // index
  mainRouter.route('/').get(function (req, res) {

    res.render('index', {
      title: 'Books I\'ve Read',
      nav: nav
    });

  });

  // evil person
  mainRouter.route('/evilPerson').get(function (req, res) {

    res.render('evilPerson', {
      title: 'Books I\'ve Read',
      nav: nav
    });

  });

  return mainRouter;

};

module.exports = router;