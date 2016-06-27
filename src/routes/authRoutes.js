// express
var express = require('express');
var authRouter = express.Router();

// passport
var passport = require('passport');

var router = function (nav) {

  // controller
  var authController = require('../controllers/authController')(nav);

  // admin
  authRouter.route('/admin').get(authController.getAdmin);

  // login
  authRouter.route('/login').post(
    passport.authenticate(
      'local',
      {
        failureRedirect: '/admin'
      }
    ),
    authController.getLogin
  );

  return authRouter;

};

module.exports = router;