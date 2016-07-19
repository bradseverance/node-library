// express
var express = require('express');
var bookRouter = express.Router();

var router = function (nav) {

  var goodReadsService = require('../services/goodReadsService')();

  // controller
  var bookController = require('../controllers/bookController')(goodReadsService, nav);

  // book list
  bookRouter.route('/list').get(bookController.getBooks);

  // author list
  bookRouter.route('/authors').get(bookController.getAuthors);

  // single book
  bookRouter.route('/book/:id').get(bookController.getBook);

  return bookRouter;

};

module.exports = router;