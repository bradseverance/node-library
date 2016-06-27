// express
var express = require('express');
var adminRouter = express.Router();

var router = function (nav) {

  // controller
  var adminController = require('../controllers/adminController')(null, nav);

  adminRouter.use(adminController.middleware);

  // don't let anyone into the admin that's not me (basically)
  adminRouter.use(function (req, res, next) {
    if (!req.user) {
      return res.redirect('/evilPerson');
    }
    next();
  });

  adminRouter.route('/home').get(adminController.getHome);

  return adminRouter;

};

module.exports = router;