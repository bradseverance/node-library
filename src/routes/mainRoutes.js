// express
var express = require('express');
var mainRouter = express.Router();

var router = function (nav) {

  // controller
  var mainController = require('../controllers/mainController')(nav);

  // index
  mainRouter.route('/').get(mainController.getIndex);

  // evil person
  mainRouter.route('/evilPerson').get(mainController.getEvilPerson);

  return mainRouter;

};

module.exports = router;