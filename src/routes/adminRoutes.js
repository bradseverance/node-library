// express
var express = require('express');
var adminRouter = express.Router();

var router = function (nav) {

  // controller
  var adminController = require('../controllers/adminController')(null, nav);

  //adminRouter.use(adminController.middleware);

  // home
  adminRouter.route('/home').get(adminController.getHome);

  return adminRouter;

};

module.exports = router;