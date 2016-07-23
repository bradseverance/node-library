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

        mongodb.connect(process.env.DB_URL, function (err, db) {

          var collection = db.collection('users');

          collection.findOne({username : username}, function (err, results) {
            if (results) {
              if (results.password === password) {
                var user = results;
                done(null, user);
              } else {
                done(null, false, { message: 'Incorrect password' });
              }
            } else {
              done(null, false, { message: 'bibbles' });
            }
          });

        });

      }
    )
  );
};