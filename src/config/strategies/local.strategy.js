// passport
var passport = require('passport');
// strategy
var LocalStrategy = require('passport-local').Strategy;
// mongo db
var mongodb = require('mongodb').MongoClient;

module.exports = function () {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'userName',
        passwordField: 'password'
      },
      function (username, password, done) {
        var user = {
          username: username,
          password: password
        };
        done (null, user);
      }
    )
  );
};