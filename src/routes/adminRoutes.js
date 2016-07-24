// express
var express = require('express');
var adminRouter = express.Router();

var router = function (nav) {

  // goodreads service
  var goodReadsService = require('../services/goodReadsService')();

  // controller
  var adminController = require('../controllers/adminController')(goodReadsService, nav);

  //adminRouter.use(adminController.middleware);

  // home
  adminRouter.route('/home').get(adminController.getHome);

  // edit book
  adminRouter.route('/book/:id').get(adminController.getBook);

  // new book
  adminRouter.route('/newbook').get(adminController.newBook);

  // upsert book
  adminRouter.route('/upsertbook').post(adminController.upsertBook);

  // import goodreads
  adminRouter.route('/importGoodReads').get(adminController.importGoodReads);

  // delete book
  adminRouter.route('/deletebook/:id').get(adminController.deleteBook);

  return adminRouter;

};

module.exports = router;