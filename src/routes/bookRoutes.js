// express
var express = require('express');
var bookRouter = express.Router();

var router = function (nav) {

  var bookService = require('../services/goodReadsService')();

  // controller
  var bookController = require('../controllers/bookController')(bookService, nav);

  // book list
  bookRouter.route('/').get(bookController.getBooks);

  // single book
  bookRouter.route('/:id').get(bookController.getBook);

  return bookRouter;

};

module.exports = router;