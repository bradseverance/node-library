var express = require('express');

var authRouter = express.Router();

// mongo db
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var router = function (nav) {

  // sign up
  authRouter.route('/signUp').post(function (req, res) {
    console.log(req.body);
    req.login(req.body, function () {
      res.redirect('/Auth/profile');
    });
  });

  // profile
  authRouter.route('/profile').get(function (req, res) {
    res.json(req.user);
  });

  return authRouter;

};

module.exports = router;