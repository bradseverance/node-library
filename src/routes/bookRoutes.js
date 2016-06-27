// express
var express = require('express');
var bookRouter = express.Router();

var router = function (nav) {

  // controller
  var bookController = require('../controllers/bookController')(null, nav);

  // book list
  bookRouter.route('/').get(bookController.getBooks);

  // single book
  bookRouter.route('/:id').get(bookController.getBook);

  return bookRouter;

};

module.exports = router;