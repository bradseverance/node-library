var express = require('express');

var adminRouter = express.Router();

// mongo db
var mongodb = require('mongodb').MongoClient;

var books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  },
  {
    title: 'Les Misérables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
  },
  {
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: false
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false
  },
  {
    title: 'Life On The Mississippi',
    genre: 'History',
    author: 'Mark Twain',
    read: false
  },
  {
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  }
];

var router = function (nav) {

  // don't let anyone into the admin that's not me (basically)
  adminRouter.use(function (req, res, next) {
    if (!req.user) {
      return res.redirect('/evilPerson');
    }
    next();
  });

  adminRouter.route('/addBooks').get(function (req, res) {

    mongodb.connect(process.env.DB_URL, function (err, db) {
      var collection = db.collection('books');
      collection.insertMany(books, function (err, results) {
        res.send(results);
        db.close();
      });
    });

  });

  adminRouter.route('/home').get(function (req, res) {

    res.render('adminHomeView', {
      title: 'Administrator Home',
      nav: nav
    });

  });

  return adminRouter;

};

module.exports = router;