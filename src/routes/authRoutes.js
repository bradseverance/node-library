var express = require('express');

var authRouter = express.Router();

// mongo db
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var router = function (nav) {

  // sign up
  authRouter.route('/signUp').post(function (req, res) {
    console.log(req.body);
  });

  return authRouter;

};

module.exports = router;