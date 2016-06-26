var express = require('express');

var authRouter = express.Router();

// mongo db
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

// passport
var passport = require('passport');

var router = function (nav) {

  // sign up
  authRouter.route('/signUp').post(function (req, res) {

    // save user
    mongodb.connect(process.env.DB_URL, function (err, db) {

      var collection = db.collection('users');

      var user = {
        username: req.body.userName,
        password: req.body.password
      };

      collection.insert(user, function (err, results) {
        req.login(results.ops[0], function () {
          res.redirect('/Auth/profile');
        });
      });

    });

  });

  // profile
  authRouter.route('/profile').get(function (req, res) {
    res.json(req.user);
  });

  // admin (login form)
  authRouter.route('/admin').get(function (req, res) {
    res.render('adminView', {nav: nav});
  });

  // login
  authRouter.route('/login').post(
    passport.authenticate(
      'local',
      {
        failureRedirect: '/admin'
      }
    ),
    function (req, res) {
      res.redirect('/admin/home');
    }
  );

  return authRouter;

};

module.exports = router;